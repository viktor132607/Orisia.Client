import type { Metadata } from "next";
import "./globals.css";
import "./admin.css";
import SiteFrame from "../components/SiteFrame";
import JsonLd from "../components/JsonLd";
import { defaultMetadata } from "../lib/seo";
import {
  organizationStructuredData,
  websiteStructuredData,
} from "../lib/structuredData";

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" suppressHydrationWarning>
      <head>
        <JsonLd id="organization-structured-data" data={organizationStructuredData} />
        <JsonLd id="website-structured-data" data={websiteStructuredData} />
      </head>
      <body>
        <SiteFrame>{children}</SiteFrame>
      </body>
    </html>
  );
}
