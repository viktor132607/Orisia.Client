import "./globals.css";
import "./site-controls.css";
import "./preferences-compact.css";
import "./mobile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DevVariantMenu from "../components/DevVariantMenu";
import CookieBanner from "../components/CookieBanner";

export const metadata = {
  title: "ОРИСИЯ",
  description: "ОРИСИЯ — български фолклор, танц и традиция",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bg" data-theme="dark">
      <body>
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
