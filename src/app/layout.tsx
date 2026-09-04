import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DevVariantMenu from "../components/DevVariantMenu";
import CookieBanner from "../components/CookieBanner";
import SiteEntranceGate from "../components/SiteEntranceGate";

export const metadata = {
  title: "ОРИСИЯ",
  description: "ОРИСИЯ — български фолклор, танц и традиция",
  icons: {
    icon: "/orisia-logo.jpg",
    shortcut: "/orisia-logo.jpg",
    apple: "/orisia-logo.jpg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className="dark" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SiteEntranceGate />
        <div className="min-h-screen pt-20 bg-orisia-cream dark:bg-orisia-dark">
          <Navbar />
          <DevVariantMenu />
          {children}
          <Footer />
          <CookieBanner />
        </div>
      </body>
    </html>
  );
}
