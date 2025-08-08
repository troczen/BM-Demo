import { useEffect, useState } from "react";
import { getMarketplaceFeed, seedLocalSamples } from "../services/marketplace.js";

export default function Classifieds(){
  const [items,setItems]=useState([]);

  const load = async ()=>{
    const feed = await getMarketplaceFeed();
    setItems(feed);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div className="card">
      <div className="title" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span>Classifieds (Phase 1 — Local)</span>
        <div style={{display:"flex",gap:8}}>
          <button className="btn" onClick={()=>{ const n=seedLocalSamples(); load(); alert(`Seeded ${n} sample listings.`); }}>Seed Sample Data</button>
          <button className="btn" onClick={load}>Refresh</button>
        </div>
      </div>
      <p className="sub">Local listings only (no external feed/webhook in Phase 1). Use <b>Seed Sample Data</b> for an instant demo.</p>

      <div className="grid cards" style={{marginTop:12}}>
        {items.map(item=> (
          <div key={item.id} className="card">
            <div className="title" style={{marginBottom:6}}>{item.title}</div>
            <div className="muted" style={{marginBottom:8}}>{item.category} · {item.city} · {new Date(item.createdAt).toLocaleString()}</div>
            <div>{item.desc}</div>
            <div style={{marginTop:10, display:"flex", gap:8}}>
              <span className="pill">${item.price}</span>
              <span className="pill">{item.tradePrice} credits</span>
            </div>
          </div>
        ))}
        {items.length===0 && <div className="muted">No listings yet.</div>}
      </div>
    </div>
  );
}