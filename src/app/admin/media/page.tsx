"use client";

import { FormEvent, useEffect, useState } from "react";
import { absoluteMediaUrl, api, type MediaResponse } from "../../../lib/api";
import useLanguage from "../../../components/useLanguage";

export default function AdminMediaPage(){
 const isBg=useLanguage()==="bg"; const [items,setItems]=useState<MediaResponse[]>([]); const [error,setError]=useState("");
 const load=()=>api.media.list().then(setItems).catch((e:Error)=>setError(e.message)); useEffect(()=>{load();},[]);
 async function upload(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=new FormData(e.currentTarget);try{await api.media.upload(form);e.currentTarget.reset();await load();}catch(x){setError(x instanceof Error?x.message:"Error");}}
 return <main className="bg-orisia-cream py-10 dark:bg-orisia-dark"><div className="mx-auto max-w-7xl px-4"><h1 className="text-4xl font-bold">{isBg?"Медия":"Media library"}</h1><form onSubmit={upload} className="mt-6 flex flex-wrap items-end gap-3 border border-orisia-line bg-orisia-paper p-5 dark:bg-orisia-panel"><label className="font-sans text-xs">File<input name="File" required type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="mt-1 block"/></label><input name="AltBg" placeholder="Alt BG" className="border border-orisia-line p-2"/><input name="AltEn" placeholder="Alt EN" className="border border-orisia-line p-2"/><button className="bg-orisia-gold px-4 py-3 text-xs font-bold text-white">Upload</button></form>{error&&<p className="mt-3 text-red-700">{error}</p>}<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map(x=><article key={x.id} className="border border-orisia-line bg-orisia-paper p-3 dark:bg-orisia-panel"><img src={absoluteMediaUrl(x.thumbnailUrl||x.url)} alt={x.altBg||x.originalFileName} className="aspect-video w-full object-cover"/><strong className="mt-2 block truncate text-sm">{x.originalFileName}</strong><p className="font-sans text-[10px]">{x.width}×{x.height} · {Math.round(x.sizeBytes/1024)} KB</p><button className="mt-2 text-xs text-red-700" onClick={()=>confirm("Delete?")&&api.media.delete(x.id).then(load).catch((e:Error)=>setError(e.message))}>Delete</button></article>)}</div></div></main>;
}
