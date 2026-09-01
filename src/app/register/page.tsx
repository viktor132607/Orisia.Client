"use client";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function Page(){
  const router=useRouter();
  return <main className="page"><div className="container auth-wrap"><form className="auth-card" onSubmit={(e)=>{e.preventDefault();router.push("/account")}}>
    <h1>Register</h1><div className="field"><label>Name</label><input placeholder="Name"/></div><div className="field"><label>Email</label><input type="email" placeholder="name@example.com"/></div><div className="field"><label>Password</label><input type="password" placeholder="Password"/></div><button className="primary-btn" type="submit">Register</button><div className="auth-switch">Already registered? <Link href="/login">Login</Link></div>
  </form></div></main>
}
