import { useState } from "react";

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
        <button className="btn" disabled>Save to My Listings</button>
        <button className="btn" disabled>Publish to App Marketplace</button>
      </div>
    </div>
  );
}