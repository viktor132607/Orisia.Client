"use client";

import { useEffect, useState } from "react";
import { api, type ContactInquiryResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function AdminMessagesPage(){
  const isBg=useLanguage()==="bg"; const [items,setItems]=useState<ContactInquiryResponse[]>([]); const [error,setError]=useState("");
  const load=()=>api.inquiries.adminList().then(setItems).catch((e:Error)=>setError(e.message)); useEffect(()=>{load();},[]);
  const action=async(fn:()=>Promise<unknown>)=>{try{await fn();await load();}catch(e){setError(e instanceof Error?e.message:"Error");}};
  return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-6xl px-4"><h1 className="text-4xl font-bold">{isBg?"Запитвания":"Inquiries"}</h1>{error&&<p className="mt-3 text-red-700">{error}</p>}<div className="mt-6 grid gap-4">{items.map(x=><article className="border border-orisia-line bg-orisia-paper p-5 dark:bg-orisia-panel" key={x.id}><div className="flex flex-wrap justify-between gap-3"><div><strong className="text-xl">{x.subject}</strong><p className="font-sans text-xs">{x.name} · {x.email} · status {x.status}</p></div><time className="font-sans text-xs">{new Date(x.createdOn).toLocaleString()}</time></div><p className="mt-4 whitespace-pre-line font-sans text-sm">{x.message}</p>{x.answerText&&<div className="mt-4 border-l-2 border-orisia-goldDark pl-3 font-sans text-sm"><strong>Answer:</strong> {x.answerText}</div>}<div className="mt-4 flex flex-wrap gap-3 text-xs">{x.status===0&&<button onClick={()=>action(()=>api.inquiries.read(x.id))}>Mark read</button>}{x.status!==3&&<button onClick={()=>{const answer=prompt(isBg?"Отговор":"Answer"); if(answer) action(()=>api.inquiries.answer(x.id,answer));}}>Answer</button>}{x.status!==3&&<button onClick={()=>action(()=>api.inquiries.archive(x.id))}>Archive</button>}<button className="text-red-700" onClick={()=>confirm("Delete?")&&action(()=>api.inquiries.delete(x.id))}>Delete</button></div></article>)}</div></div></main>;
}
