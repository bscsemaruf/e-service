// app/layout.tsx
// কেন? Root layout — সব page এর common wrapper।
// Navbar, Footer, Toast notification এখানে।

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AC & Refrigerator Service | Professional Repair",
  description:
    "Professional AC repair, gas refill, installation, and refrigerator service in your city.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        {/* Toast notification — সব page এ কাজ করবে */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { borderRadius: "10px", fontWeight: "500" },
          }}
        />
      </body>
    </html>
  );
}
