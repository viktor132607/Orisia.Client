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
    icon: "/orisia-logo.svg",
    shortcut: "/orisia-logo.svg",
    apple: "/orisia-logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" className="dark" data-theme="dark" suppressHydrationWarning>
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
