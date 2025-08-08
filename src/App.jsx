import React, { useMemo, useState } from 'react'
import InventoryForm from './components/InventoryForm.jsx'
import PriceScanner from './components/PriceScanner.jsx'
import SpreadCalculator from './components/SpreadCalculator.jsx'
import ArbitrageLab from './components/ArbitrageLab.jsx'
import FlowDiagram from './components/FlowDiagram.jsx'
import { seedMock } from './lib/mock.js'

export default function App(){
  const [inventory,setInventory]=useState(()=>seedMock())
  const [selected,setSelected]=useState(null)
  const [marketData,setMarketData]=useState({}) // itemId -> markets

  const onAddItem = (item)=>{
    setInventory(prev=>[item,...prev])
  }

  const onAttachMarketData = (itemId, data)=>{
    setMarketData(prev=>({...prev,[itemId]:data}))
  }

  const currentItem = useMemo(()=>inventory.find(i=>i.id===selected)||null,[inventory,selected])

  return (
    <div className="shell grid" style={{gap:24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0}}>Barter Mastery Demo</h1>
          <p className="sub">Client-only mock. Add an item, scan markets, calculate spread, and find a 3-leg arbitrage path.</p>
        </div>
        <div>
          <a href="https://render.com" target="_blank" rel="noreferrer">Render-ready</a> · <span className="kbd">npm run dev</span>
        </div>
      </header>

      <section className="grid cards">
        <div className="card">
          <h3 className="title">Add Inventory</h3>
          <p className="sub">Photo → description flow stubbed; enter details to simulate.</p>
          <InventoryForm onAdd={onAddItem} />
        </div>

        <div className="card">
          <h3 className="title">Inventory</h3>
          {inventory.length===0 && <p className="muted">No items yet.</p>}
          <ul style={{listStyle:'none',padding:0,margin:0}}>
            {inventory.map(item=>(
              <li key={item.id} style={{padding:'8px 0',borderBottom:'1px solid #1f2937',display:'flex',justifyContent:'space-between',gap:10}}>
                <div>
                  <div style={{fontWeight:600}}>{item.title}</div>
                  <div className="muted mono">Cost: ${item.cost.toFixed(2)} · FMV Guess: ${item.fmv}</div>
                  <div>
                    {item.tags.map(t=><span key={t} className="pill">{t}</span>)}
                  </div>
                </div>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <button className="btn" onClick={()=>setSelected(item.id)}>Select</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h3 className="title">Pyramid Flow (Diagram)</h3>
          <FlowDiagram />
        </div>
      </section>

      <section className="grid cards">
        <div className="card">
          <h3 className="title">Multi-Market Price Scan</h3>
          <PriceScanner item={currentItem} onResult={(data)=>onAttachMarketData(currentItem?.id, data)} />
        </div>
        <div className="card">
          <h3 className="title">Spread & ROI Calculator</h3>
          <SpreadCalculator item={currentItem} markets={marketData[currentItem?.id]} />
        </div>
        <div className="card">
          <h3 className="title">Arbitrage Lab (3-Leg)</h3>
          <ArbitrageLab item={currentItem} markets={marketData[currentItem?.id]} />
        </div>
      </section>

      <footer className="muted">Demo only: replace mock scanners with real eBay/Craigslist adapters later.</footer>
    </div>
  )
}
