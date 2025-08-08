import React, { useMemo, useState } from 'react'
import { findThreeLegPath } from '../lib/arbitrage.js'

export default function ArbitrageLab({ item, markets }){
  const [threshold,setThreshold]=useState(0.25)

  const plan = useMemo(()=>{
    if(!item || !markets) return null
    return findThreeLegPath({ item, markets, minProfit: threshold })
  },[item,markets,threshold])

  return (
    <div className="grid" style={{gap:10}}>
      {!item && <p className="muted">Select an item and run a scan.</p>}
      {item && markets && (
        <>
          <div>
            <label>Minimum net margin (%)</label>
            <input type="number" step="0.01" value={threshold} onChange={e=>setThreshold(Number(e.target.value))} />
          </div>
          {plan ? (
            <div className="card">
              <div><strong>Path:</strong></div>
              <ol>
                <li>Acquire <strong>{item.title}</strong> for <span className="mono">${item.cost.toFixed(2)}</span></li>
                <li>Trade in <strong>{plan.step1.market}</strong> → get <strong>{plan.step1.to}</strong> (est. value <span className="mono">${plan.step1.value}</span>)</li>
                <li>Sell/Trade in <strong>{plan.step2.market}</strong> → exit at <span className="mono">${plan.step2.exit}</span></li>
              </ol>
              <div className="ok"><strong>Projected Net Margin:</strong> {(plan.netMargin*100).toFixed(1)}%</div>
              <div className="mono">Notes: {plan.notes}</div>
            </div>
          ) : (
            <p className="muted">No 3-leg path over threshold. Try lowering the threshold or adding tags like "hot" or "in-demand".</p>
          )}
        </>
      )}
    </div>
  )
}
