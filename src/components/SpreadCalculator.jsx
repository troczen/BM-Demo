import React, { useMemo, useState } from 'react'
import { calcSpread } from '../lib/spread.js'

export default function SpreadCalculator({ item, markets }){
  const [feesPct,setFeesPct]=useState(0.12)
  const [holdingDays,setHoldingDays]=useState(7)

  const bestMarket = useMemo(()=>{
    if(!markets) return null
    const entries = Object.entries(markets).map(([k,v])=>({market:k, ...v}))
    return entries.sort((a,b)=>b.median-a.median)[0] || null
  },[markets])

  const result = useMemo(()=>{
    if(!item || !bestMarket) return null
    return calcSpread({ cost:item.cost, expectedSale: bestMarket.median, feesPct, holdingDays })
  },[item,bestMarket,feesPct,holdingDays])

  return (
    <div className="grid" style={{gap:10}}>
      {!item && <p className="muted">Select an item to compute ROI.</p>}
      {item && !markets && <p className="muted">Run a price scan to pick a target market.</p>}
      {item && markets && (
        <>
          <div className="row">
            <div>
              <label>Fees % (platform + shipping)</label>
              <input type="number" step="0.01" value={feesPct} onChange={e=>setFeesPct(Number(e.target.value))} />
            </div>
            <div>
              <label>Holding time (days)</label>
              <input type="number" value={holdingDays} onChange={e=>setHoldingDays(Number(e.target.value))} />
            </div>
          </div>
          {result && (
            <div className="card">
              <div><strong>Net Profit:</strong> ${result.netProfit.toFixed(2)}</div>
              <div>Gross Spread: <span className={result.grossSpread>=0.5?'ok':result.grossSpread>=0.2?'warn':'bad'}>{(result.grossSpread*100).toFixed(1)}%</span></div>
              <div>Net Margin: {(result.netMargin*100).toFixed(1)}%</div>
              <div>Daily ROI: {(result.dailyROI*100).toFixed(2)}%</div>
              <div className="mono">Target exit: ${result.expectedSale.toFixed(2)} · Fees: ${(result.fees).toFixed(2)}</div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
