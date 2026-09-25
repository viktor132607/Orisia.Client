"use client";

import { useEffect, useState } from "react";
import { api, type SiteReviewResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function AdminReviewsPage(){
 const isBg=useLanguage()==="bg"; const [items,setItems]=useState<SiteReviewResponse[]>([]); const [error,setError]=useState("");
 const load=()=>api.reviews.adminList().then(setItems).catch((e:Error)=>setError(e.message)); useEffect(()=>{load();},[]);
 const action=async(fn:()=>Promise<unknown>)=>{try{await fn();await load();}catch(e){setError(e instanceof Error?e.message:"Error");}};
 return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-6xl px-4"><h1 className="text-4xl font-bold">{isBg?"Отзиви":"Reviews"}</h1>{error&&<p className="text-red-700">{error}</p>}<div className="mt-6 grid gap-4">{items.map(x=><article key={x.id} className="border border-orisia-line bg-orisia-paper p-5 dark:bg-orisia-panel"><div className="flex justify-between gap-3"><strong>{x.authorName} · {"★".repeat(x.rating)}</strong><span className="font-sans text-xs">status {x.status}</span></div><p className="mt-3 font-sans text-sm">{x.content}</p><div className="mt-4 flex flex-wrap gap-3 text-xs">{x.status!==1&&<button onClick={()=>action(()=>api.reviews.approve(x.id))}>Approve</button>}{x.status!==2&&<button onClick={()=>action(()=>api.reviews.reject(x.id))}>Reject</button>}{x.status===1&&<button onClick={()=>action(()=>api.reviews.feature(x.id,!x.featured))}>{x.featured?"Unfeature":"Feature"}</button>}<button className="text-red-700" onClick={()=>confirm("Delete?")&&action(()=>api.reviews.delete(x.id))}>Delete</button></div></article>)}</div></div></main>;
}
