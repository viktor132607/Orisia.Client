import type { Metadata } from "next";
import { Suspense } from "react";
import "../index.css";
import "../App.css";
import "react-quill/dist/quill.snow.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Orisia",
  description: "Orisia online store",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  );
}
