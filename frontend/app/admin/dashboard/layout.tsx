// // // app/admin/dashboard/layout.tsx
// // // কেন? Admin dashboard এর Sidebar layout।

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Wrench,
  MessageSquare,
  LogOut,
  Wind,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const sidebarLinks = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/services", label: "Services", icon: Wrench },
  { href: "/admin/dashboard/contacts", label: "Messages", icon: MessageSquare },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { admin, isMounted, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Route change হলে mobile sidebar বন্ধ করো
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Auth check
  useEffect(() => {
    if (isMounted && !admin) {
      router.replace("/admin/login");
    }
  }, [isMounted, admin, router]);

  // Loading
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  if (!admin) return null;

  // Sidebar content — desktop ও mobile দুটোতেই same
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-800 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-white hover:text-blue-400 transition-colors"
        >
          <Wind className="w-5 h-5 text-blue-400" />
          <span>CoolFix</span>
        </Link>
        {/* Mobile এ close button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-3 space-y-1">
        {sidebarLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-gray-800"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      {/* Admin Info + Logout */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-3 px-1">
          {/* Avatar */}
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
            {admin.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">
              {admin.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{admin.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Desktop Sidebar ─────────────────────────────
          lg (1024px+) তে সবসময় দেখাবে
          ────────────────────────────────────────────── */}
      <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col shrink-0 sticky top-0 h-screen">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar ──────────────────────────────
          lg এর নিচে hamburger click করলে দেখাবে
          ────────────────────────────────────────────── */}
      {sidebarOpen && (
        <>
          {/* Dark overlay */}
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Drawer */}
          <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50 lg:hidden shadow-2xl">
            <SidebarContent />
          </aside>
        </>
      )}

      {/* ── Main Area ───────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Top Header — lg তে লুকানো */}
        <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 font-bold text-gray-900">
            <Link href={"/"}>
              <Wind className="w-5 h-5 text-blue-600" />
              <span>CoolFix</span>
            </Link>
          </div>

          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
            {admin.name.charAt(0).toUpperCase()}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useState, useCallback } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Wrench,
//   MessageSquare,
//   LogOut,
//   Wind,
//   Menu,
//   X,
// } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";

// const sidebarLinks = [
//   { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
//   { href: "/admin/dashboard/services", label: "Services", icon: Wrench },
//   { href: "/admin/dashboard/contacts", label: "Messages", icon: MessageSquare },
// ];

// // ✅ Fix 2: SidebarContent কে component এর বাইরে নিয়ে যাও
// // এখন প্রতিটি render এ নতুন component তৈরি হবে না
// interface SidebarContentProps {
//   admin: { name: string; email: string };
//   pathname: string;
//   onClose: () => void;
//   onLogout: () => void;
// }

// function SidebarContent({
//   admin,
//   pathname,
//   onClose,
//   onLogout,
// }: SidebarContentProps) {
//   return (
//     <div className="flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-5 border-b border-gray-800 flex items-center justify-between">
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-bold text-lg text-white hover:text-blue-400 transition-colors"
//         >
//           <Wind className="w-5 h-5 text-blue-400" />
//           <span>CoolFix</span>
//         </Link>
//         {/* Mobile close button */}
//         <button
//           onClick={onClose}
//           className="lg:hidden p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
//           aria-label="Close sidebar"
//         >
//           <X className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-3 space-y-1">
//         {sidebarLinks.map(({ href, label, icon: Icon }) => (
//           <Link
//             key={href}
//             href={href}
//             className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//               pathname === href
//                 ? "bg-blue-600 text-white"
//                 : "text-gray-400 hover:text-white hover:bg-gray-800"
//             }`}
//           >
//             <Icon className="w-4 h-4" />
//             {label}
//           </Link>
//         ))}
//       </nav>

//       {/* Admin Info + Logout */}
//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center gap-3 mb-3 px-1">
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
//             {admin.name.charAt(0).toUpperCase()}
//           </div>
//           <div className="min-w-0">
//             <p className="text-sm font-semibold text-white truncate">
//               {admin.name}
//             </p>
//             <p className="text-xs text-gray-500 truncate">{admin.email}</p>
//           </div>
//         </div>
//         <button
//           onClick={onLogout}
//           className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// // ══════════════════════════════════════════
// // Main Layout Component
// // ══════════════════════════════════════════
// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { admin, isMounted, logout } = useAuth();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // ✅ Fix 1: useCallback দিয়ে stable reference তৈরি করো
//   const closeSidebar = useCallback(() => {
//     setSidebarOpen(false);
//   }, []);

//   // ✅ Fix 1: pathname change এ sidebar বন্ধ করো
//   // useEffect এ setState এর বদলে
//   // startTransition বা useCallback ব্যবহার করা যায়
//   // কিন্তু সবচেয়ে সহজ fix হলো pathname কে dependency তে রেখে
//   // একটা ref দিয়ে track করা
//   const prevPathnameRef = useState(pathname);
//   useEffect(() => {
//     if (prevPathnameRef[0] !== pathname) {
//       closeSidebar();
//     }
//   }, [pathname, closeSidebar, prevPathnameRef]);

//   // Auth check
//   useEffect(() => {
//     if (isMounted && !admin) {
//       router.replace("/admin/login");
//     }
//   }, [isMounted, admin, router]);

//   // Sidebar open থাকলে body scroll বন্ধ করো
//   useEffect(() => {
//     if (sidebarOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "";
//     }
//     return () => {
//       document.body.style.overflow = "";
//     };
//   }, [sidebarOpen]);

//   // Loading
//   if (!isMounted) {
//     return (
//       <div className="min-h-screen bg-gray-900 flex items-center justify-center">
//         <div className="flex flex-col items-center gap-3">
//           <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
//           <p className="text-gray-400 text-sm">Loading...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!admin) return null;

//   return (
//     <div className="min-h-dvh bg-gray-50 flex overflow-x-hidden">
//       {/* Desktop Sidebar — lg তে দেখাবে */}
//       <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col shrink-0 sticky top-0 h-screen">
//         <SidebarContent
//           admin={admin}
//           pathname={pathname}
//           onClose={closeSidebar}
//           onLogout={logout}
//         />
//       </aside>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <>
//           <div
//             className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//             onClick={closeSidebar}
//           />
//           <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50 lg:hidden shadow-2xl">
//             <SidebarContent
//               admin={admin}
//               pathname={pathname}
//               onClose={closeSidebar}
//               onLogout={logout}
//             />
//           </aside>
//         </>
//       )}

//       {/* Main Area */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Mobile Header */}
//         <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm">
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Open sidebar"
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           <Link
//             href="/"
//             className="flex items-center gap-2 font-bold text-gray-900"
//           >
//             <Wind className="w-5 h-5 text-blue-600" />
//             <span>CoolFix</span>
//           </Link>

//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//             {admin.name.charAt(0).toUpperCase()}
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }
