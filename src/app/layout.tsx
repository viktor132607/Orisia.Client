import "./globals.css";
import "./site-controls.css";
import "./preferences-compact.css";
import "./mobile.css";
import "./navbar-overrides.css";
import "./entrance-gate.css";
import "./flat-theme.css";
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
    <html lang="bg" data-theme="dark">
      <body>
        <SiteEntranceGate />
        <div className="site-shell">
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
