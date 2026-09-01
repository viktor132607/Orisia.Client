"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Page(){
  const router=useRouter();
  return <main className="page"><div className="container auth-wrap"><form className="auth-card" onSubmit={(e)=>{e.preventDefault();router.push("/account")}}>
    <h1>Login</h1><div className="field"><label>Email</label><input type="email" placeholder="name@example.com"/></div><div className="field"><label>Password</label><input type="password" placeholder="Password"/></div><button className="primary-btn" type="submit">Login</button><div className="auth-switch">No account? <Link href="/register">Register</Link></div>
  </form></div></main>
}
