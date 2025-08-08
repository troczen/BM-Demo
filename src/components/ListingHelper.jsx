import { useState } from "react";
import { publishToWebhook } from "../services/marketplace.js";

export default function ListingHelper(){
  const [file,setFile]=useState(null);
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [cat,setCat]=useState("");
  const [price,setPrice]=useState("");
  const [tradePrice,setTradePrice]=useState("");

  const fakeAI = ()=>{
    // simple heuristics; replace with real AI later
    const name = (file?.name || "Item").replace(/\.[^.]+$/, "");
    const suggestedTitle = title || name.replace(/[-_]/g," ").replace(/\s+/g," ").trim();
    const suggestedDesc = desc || `Pre-owned ${suggestedTitle} in good condition. Fully tested. Includes essential accessories.`;
    const suggestedCat  = cat || "General Merchandise";
    const base = suggestedTitle.length*3 + 50; // hokey estimate
    const suggestedPrice = price || Math.max(20, Math.round(base));
    const suggestedTrade = tradePrice || Math.round(suggestedPrice*1.05);
    setTitle(suggestedTitle);
    setDesc(suggestedDesc);
    setCat(suggestedCat);
    setPrice(String(suggestedPrice));
    setTradePrice(String(suggestedTrade));
  };

  const buildItem = ()=>({
    id: crypto.randomUUID(),
    title,
    category: cat,
    price: Number(price||0),
    tradePrice: Number(tradePrice||0),
    desc,
    imageName: file?.name || "",
    city: "",
    createdAt: Date.now(),
    published: true,
    source: "local",
  });

  const saveLocal = ()=>{
    const item = buildItem();
    const current = JSON.parse(localStorage.getItem("listings")||"[]");
    localStorage.setItem("listings", JSON.stringify([item, ...current]));
    alert("Saved locally. Visible in Classifieds.");
  };

  const publish = async ()=>{
    const item = buildItem();
    const current = JSON.parse(localStorage.getItem("listings")||"[]");
    localStorage.setItem("listings", JSON.stringify([item, ...current]));
    const res = await publishToWebhook(item);
    alert(res.ok
      ? "Published (webhook accepted)."
      : "Saved locally and visible in Classifieds. External broadcast is Phase 2.");
  };

  return (
    <div className="card">
      <div className="title">Quick Add: Image → Listing (Demo)</div>
      <p className="sub">Upload an image and auto-fill suggested title/description/category and prices (mocked).</p>
      <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <button className="btn" style={{marginTop:8}} onClick={fakeAI}>Generate Suggestions</button>
      <div className="grid" style={{gap:10, marginTop:12}}>
        <div><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
        <div><label>Category</label><input value={cat} onChange={e=>setCat(e.target.value)} /></div>
        <div><label>Cash Price ($)</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} /></div>
        <div><label>Trade Price ($ credits)</label><input type="number" value={tradePrice} onChange={e=>setTradePrice(e.target.value)} /></div>
      </div>
      <label style={{marginTop:8}}>Description</label>
      <textarea rows={5} value={desc} onChange={e=>setDesc(e.target.value)} />
      <div style={{marginTop:8, display:"flex", gap:8}}>
        <button className="btn" onClick={saveLocal}>Save to My Listings</button>
        <button className="btn" onClick={publish}>Publish to Marketplace</button>
      </div>
    </div>
  );
}