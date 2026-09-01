import Link from "next/link";

export default function Footer(){
  return <footer className="footer"><div className="container footer-inner">
    <span>© 2026 Orisia</span><div className="footer-links"><Link href="/about">About</Link><Link href="/contact">Contact</Link></div>
  </div></footer>
}
