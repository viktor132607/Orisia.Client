"use client";

import { useEffect, useState } from "react";
import { api, type UserResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function AdminUsersPage(){
 const isBg=useLanguage()==="bg"; const [items,setItems]=useState<UserResponse[]>([]); const [error,setError]=useState("");
 const load=()=>api.users.list().then(setItems).catch((e:Error)=>setError(e.message)); useEffect(()=>{load();},[]);
 const action=async(fn:()=>Promise<unknown>)=>{try{await fn();await load();}catch(e){setError(e instanceof Error?e.message:"Error");}};
 return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-6xl px-4"><h1 className="text-4xl font-bold">{isBg?"Потребители":"Users"}</h1>{error&&<p className="text-red-700">{error}</p>}<div className="mt-6 overflow-x-auto"><table className="w-full border-collapse bg-orisia-paper text-left font-sans text-sm dark:bg-orisia-panel"><thead><tr>{["Name","Email","Role","Status","Actions"].map(x=><th className="border border-orisia-line p-3" key={x}>{x}</th>)}</tr></thead><tbody>{items.map(x=><tr key={x.id}><td className="border border-orisia-line p-3">{x.names}</td><td className="border border-orisia-line p-3">{x.email}</td><td className="border border-orisia-line p-3"><select value={x.role||"User"} onChange={e=>action(()=>api.users.role(x.id,e.target.value))} className="bg-transparent"><option>User</option><option>Editor</option><option>Admin</option></select></td><td className="border border-orisia-line p-3">{x.isActive?"Active":"Inactive"}</td><td className="border border-orisia-line p-3">{x.isActive?<button onClick={()=>action(()=>api.users.deactivate(x.id))}>Deactivate</button>:<button onClick={()=>action(()=>api.users.activate(x.id))}>Activate</button>}</td></tr>)}</tbody></table></div></div></main>;
}
