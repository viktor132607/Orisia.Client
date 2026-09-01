import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata={title:"Orisia",description:"Orisia frontend skeleton"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><div className="site-shell"><Navbar/>{children}<Footer/></div></body></html>
}
