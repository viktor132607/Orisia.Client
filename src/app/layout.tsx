import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DevVariantMenu from "../components/DevVariantMenu";
import CookieBanner from "../components/CookieBanner";
import SiteEntranceGate from "../components/SiteEntranceGate";
import JsonLd from "../components/JsonLd";
import { defaultMetadata } from "../lib/seo";
import {
  organizationStructuredData,
  websiteStructuredData,
} from "../lib/structuredData";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <JsonLd id="organization-structured-data" data={organizationStructuredData} />
        <JsonLd id="website-structured-data" data={websiteStructuredData} />
      </head>
      <body>
        <SiteEntranceGate />
        <div className="flex min-h-screen flex-col bg-orisia-cream pt-20 dark:bg-orisia-dark">
          <Navbar />
          {process.env.NODE_ENV !== "production" ? <DevVariantMenu /> : null}
          <div className="flex-1">{children}</div>
          <Footer />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
