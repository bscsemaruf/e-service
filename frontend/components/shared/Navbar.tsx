// // components/shared/Navbar.tsx
// // কেন? সব public page এ এই Navbar দেখাবে।
// // Mobile responsive menu সহ।

// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, X, Wind } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/services", label: "Services" },
//   { href: "/about", label: "About" },
//   { href: "/contact", label: "Contact" },
// ];

// export default function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const pathname = usePathname();
//   const { isAuthenticated } = useAuth();

//   // Admin page এ Navbar দেখাবে না
//   if (pathname.startsWith("/admin")) return null;

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
//       <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <Link
//             href="/"
//             className="flex items-center gap-2 font-bold text-xl text-blue-600"
//           >
//             <Wind className="w-6 h-6" />
//             <span>CoolFix</span>
//           </Link>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className={`text-sm font-medium transition-colors hover:text-blue-600 ${
//                   pathname === link.href
//                     ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
//                     : "text-gray-600"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link href="/contact" className="btn-primary text-sm py-2 px-5">
//               Book Service
//             </Link>
//             <Link
//               href={isAuthenticated ? "admin/dashboard" : "admin/login"}
//               className="flex items-center gap-2 font-bold text-x "
//             >
//               <span>Admin</span>
//             </Link>
//           </div>

//           {/* Mobile menu button */}
//           <button
//             className="md:hidden p-2 rounded-lg hover:bg-gray-100"
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             aria-label="Toggle menu"
//           >
//             {isMenuOpen ? (
//               <X className="w-5 h-5" />
//             ) : (
//               <Menu className="w-5 h-5" />
//             )}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden border-t border-gray-100 py-4 flex flex-col gap-3">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 onClick={() => setIsMenuOpen(false)}
//                 className={`px-2 py-2 text-sm font-medium rounded-lg transition-colors ${
//                   pathname === link.href
//                     ? "text-blue-600 bg-blue-50"
//                     : "text-gray-600 hover:bg-gray-50"
//                 }`}
//               >
//                 {link.label}
//               </Link>
//             ))}
//             <Link
//               href="/contact"
//               onClick={() => setIsMenuOpen(false)}
//               className="btn-primary text-sm text-center"
//             >
//               Book Service
//             </Link>
//             <Link
//               href={isAuthenticated ? "admin/dashboard" : "admin/login"}
//               className="flex items-center gap-2 font-bold text-sm "
//             >
//               <span>Admin</span>
//             </Link>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Wind } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Route change হলে menu বন্ধ করো
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Menu open থাকলে body scroll বন্ধ
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Admin page এ Navbar দেখাবে না
  if (pathname.startsWith("/admin")) return null;

  // ✅ isAuthenticated দেখে সঠিক URL দাও
  const adminHref = isAuthenticated ? "/admin/dashboard" : "/admin/login";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl text-blue-600"
          >
            <Wind className="w-6 h-6" />
            <span>CoolFix</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  pathname === link.href
                    ? "text-blue-600 border-b-2 border-blue-600 pb-0.5"
                    : "text-gray-600"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/contact" className="btn-primary text-sm py-2 px-5">
              Book Service
            </Link>

            {/* ✅ Admin link */}
            <Link
              href={adminHref}
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
                isAuthenticated
                  ? "text-green-600 bg-green-50 hover:bg-green-100"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isAuthenticated ? "Dashboard" : "Admin"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 top-16 bg-black/20 z-40 md:hidden"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Drawer */}
          <div className="fixed top-16 left-0 right-0 bg-white z-50 md:hidden border-t border-gray-100 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                    pathname === link.href
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary text-sm text-center"
              >
                Book Service
              </Link>

              {/* ✅ Admin link mobile */}
              <Link
                href={adminHref}
                onClick={() => setIsMenuOpen(false)}
                className={`px-4 py-3 text-sm font-semibold rounded-xl text-center transition-colors ${
                  isAuthenticated
                    ? "text-green-600 bg-green-50"
                    : "text-gray-600 bg-gray-50"
                }`}
              >
                {isAuthenticated ? "Dashboard" : "Admin"}
              </Link>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
