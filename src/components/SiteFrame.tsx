"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CookieBanner from "./CookieBanner";

export default function SiteFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? "/";
  const workspace = pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/adminlogin" || pathname.startsWith("/adminlogin/") || pathname === "/account" || pathname.startsWith("/account/");

  return (
    <div className={`flex min-h-screen flex-col ${workspace ? "bg-[#f5f7f8]" : "bg-orisia-cream"}`}>
      {!workspace && <Navbar />}
      <div className="flex-1">{children}</div>
      {!workspace && <Footer />}
      {!workspace && <CookieBanner />}
    </div>
  );
}
