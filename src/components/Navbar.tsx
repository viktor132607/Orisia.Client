import Link from "next/link";

export default function Navbar(){
  return <header className="navbar"><div className="container nav-inner">
    <Link href="/" className="brand">Orisia</Link>
    <nav className="nav-links" aria-label="Main navigation">
      <Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/login" className="login-link">Login</Link>
    </nav>
  </div></header>
}
