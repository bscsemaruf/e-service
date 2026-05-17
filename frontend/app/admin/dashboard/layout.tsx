// // // app/admin/dashboard/layout.tsx
// // // কেন? Admin dashboard এর Sidebar layout।

// // "use client";

// // import Link from "next/link";
// // import { usePathname } from "next/navigation";
// // import {
// //   LayoutDashboard,
// //   Wrench,
// //   MessageSquare,
// //   LogOut,
// //   Wind,
// // } from "lucide-react";
// // import { useAuth } from "@/hooks/useAuth";

// // const sidebarLinks = [
// //   { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
// //   { href: "/admin/dashboard/services", label: "Services", icon: Wrench },
// //   { href: "/admin/dashboard/contacts", label: "Messages", icon: MessageSquare },
// // ];

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const pathname = usePathname();
// //   const { admin, logout } = useAuth();

// //   return (
// //     <div className="min-h-screen bg-gray-50 flex">
// //       {/* Sidebar */}
// //       <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0">
// //         {/* Logo */}
// //         <div className="p-6 border-b border-gray-800">
// //           <Link
// //             href="/"
// //             className="flex items-center gap-2 font-bold text-xl text-blue-600"
// //           >
// //             <Wind className="w-6 h-6" />
// //             <span>CoolFix</span>
// //           </Link>
// //           {/* <div className="flex items-center gap-2 font-bold text-lg">
// //             <Wind className="w-5 h-5 text-blue-400" />
// //             <span>CoolFix Admin</span>
// //           </div> */}
// //         </div>

// //         {/* Nav Links */}
// //         <nav className="flex-1 p-4 space-y-1">
// //           {sidebarLinks.map(({ href, label, icon: Icon }) => (
// //             <Link
// //               key={href}
// //               href={href}
// //               className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
// //                 pathname === href
// //                   ? "bg-blue-600 text-white"
// //                   : "text-gray-400 hover:text-white hover:bg-gray-800"
// //               }`}
// //             >
// //               <Icon className="w-4 h-4" />
// //               {label}
// //             </Link>
// //           ))}
// //         </nav>

// //         {/* Admin Info + Logout */}
// //         <div className="p-4 border-t border-gray-800">
// //           <div className="mb-3 px-2">
// //             <p className="text-xs text-gray-500">Logged in as</p>
// //             <p className="text-sm font-semibold text-white truncate">
// //               {admin?.name}
// //             </p>
// //           </div>
// //           <button
// //             onClick={logout}
// //             className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
// //           >
// //             <LogOut className="w-4 h-4" /> Logout
// //           </button>
// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <main className="flex-1 overflow-auto">
// //         <div className="p-6 md:p-8">{children}</div>
// //       </main>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import {
//   LayoutDashboard,
//   Wrench,
//   MessageSquare,
//   LogOut,
//   Wind,
// } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";

// const sidebarLinks = [
//   { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
//   { href: "/admin/dashboard/services", label: "Services", icon: Wrench },
//   { href: "/admin/dashboard/contacts", label: "Messages", icon: MessageSquare },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();

//   // ✅ isMounted নাও — hydration fix এর জন্য
//   const { admin, isMounted, logout } = useAuth();

//   // ✅ Mount হলে admin নেই → login এ পাঠাও
//   useEffect(() => {
//     if (isMounted && !admin) {
//       router.replace("/admin/login");
//     }
//   }, [isMounted, admin, router]);

//   // ✅ Mount হওয়ার আগে loading দেখাও
//   // Server ও Client দুটোতেই same দেখাবে → No mismatch!
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

//   // ✅ Admin নেই → null (redirect হবে useEffect থেকে)
//   if (!admin) return null;

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white flex flex-col shrink-0 sticky top-0 h-screen">
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-800">
//           <Link
//             href="/"
//             className="flex items-center gap-2 font-bold text-lg text-white hover:text-blue-400 transition-colors"
//           >
//             <Wind className="w-5 h-5 text-blue-400" />
//             <span>CoolFix</span>
//           </Link>
//         </div>

//         {/* Nav Links */}
//         <nav className="flex-1 p-4 space-y-1">
//           {sidebarLinks.map(({ href, label, icon: Icon }) => (
//             <Link
//               key={href}
//               href={href}
//               className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
//                 pathname === href
//                   ? "bg-blue-600 text-white"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//               }`}
//             >
//               <Icon className="w-4 h-4" />
//               {label}
//             </Link>
//           ))}
//         </nav>

//         {/* Admin Info + Logout */}
//         <div className="p-4 border-t border-gray-800">
//           <div className="mb-3 px-2">
//             <p className="text-xs text-gray-500">Logged in as</p>
//             {/* ✅ isMounted true হলেই admin.name দেখাও */}
//             <p className="text-sm font-semibold text-white truncate">
//               {admin.name}
//             </p>
//             <p className="text-xs text-gray-500 truncate">{admin.email}</p>
//           </div>
//           <button
//             onClick={logout}
//             className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
//           >
//             <LogOut className="w-4 h-4" />
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 overflow-auto">
//         <div className="p-6 md:p-8">{children}</div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import { useEffect, useState } from "react";
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

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const pathname = usePathname();
//   const router = useRouter();
//   const { admin, isMounted, logout } = useAuth();

//   // Mobile sidebar open/close
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Route change হলে sidebar বন্ধ করো
//   useEffect(() => {
//     setSidebarOpen(false);
//   }, [pathname]);

//   // Auth check
//   useEffect(() => {
//     if (isMounted && !admin) {
//       router.replace("/admin/login");
//     }
//   }, [isMounted, admin, router]);

//   // Loading state
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

//   // Sidebar content — reuse করবো desktop ও mobile তে
//   const SidebarContent = () => (
//     <div className="flex flex-col h-full">
//       {/* Logo */}
//       <div className="p-6 border-b border-gray-800 flex items-center justify-between">
//         <Link
//           href="/"
//           className="flex items-center gap-2 font-bold text-lg text-white hover:text-blue-400 transition-colors"
//         >
//           <Wind className="w-5 h-5 text-blue-400" />
//           <span>CoolFix</span>
//         </Link>
//         {/* Mobile close button */}
//         <button
//           onClick={() => setSidebarOpen(false)}
//           className="lg:hidden p-1 text-gray-400 hover:text-white"
//         >
//           <X className="w-5 h-5" />
//         </button>
//       </div>

//       {/* Nav Links */}
//       <nav className="flex-1 p-4 space-y-1">
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
//         <div className="mb-3 px-2">
//           <p className="text-xs text-gray-500">Logged in as</p>
//           <p className="text-sm font-semibold text-white truncate">
//             {admin.name}
//           </p>
//           <p className="text-xs text-gray-500 truncate">{admin.email}</p>
//         </div>
//         <button
//           onClick={logout}
//           className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
//         >
//           <LogOut className="w-4 h-4" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 flex">
//       {/* ── Desktop Sidebar ── lg স্ক্রিনে সবসময় দেখাবে */}
//       <aside className="hidden lg:flex w-64 bg-gray-900 text-white flex-col shrink-0 sticky top-0 h-screen">
//         <SidebarContent />
//       </aside>

//       {/* ── Mobile Sidebar Overlay ── */}
//       {sidebarOpen && (
//         <>
//           {/* Background overlay — click করলে বন্ধ হবে */}
//           <div
//             className="fixed inset-0 bg-black/60 z-40 lg:hidden"
//             onClick={() => setSidebarOpen(false)}
//           />

//           {/* Sidebar drawer */}
//           <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col z-50 lg:hidden shadow-2xl">
//             <SidebarContent />
//           </aside>
//         </>
//       )}

//       {/* ── Main Content ── */}
//       <div className="flex-1 flex flex-col min-w-0">
//         {/* Mobile Top Navbar */}
//         <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
//           {/* Hamburger button */}
//           <button
//             onClick={() => setSidebarOpen(true)}
//             className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//             aria-label="Open menu"
//           >
//             <Menu className="w-5 h-5" />
//           </button>

//           {/* Logo center */}
//           <div className="flex items-center gap-2 font-bold text-gray-900">
//             <Wind className="w-5 h-5 text-blue-600" />
//             <span>CoolFix</span>
//           </div>

//           {/* Admin avatar */}
//           <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
//             {admin.name.charAt(0).toUpperCase()}
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

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
            <Wind className="w-5 h-5 text-blue-600" />
            <span>CoolFix</span>
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
