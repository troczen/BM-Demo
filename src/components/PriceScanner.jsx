import React, { useEffect, useState } from 'react'
import { mockScanMarkets } from '../lib/scanner.js'

export default function PriceScanner({ item, onResult }){
  const [loading,setLoading]=useState(false)
  const [data,setData]=useState(null)
  const [error,setError]=useState(null)

  const run = async()=>{
    if(!item){ setError('Select an inventory item first.'); return }
    setLoading(true); setError(null)
    try{
      const res = await mockScanMarkets(item)
      setData(res)
      onResult && onResult(res)
    }catch(e){
      setError(e.message||'Scan failed')
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <p className="sub">Mock: generates eBay / Craigslist / FB ranges based on your FMV guess.</p>
      <button className="btn" onClick={run} disabled={!item || loading}>{loading?'Scanning...':'Run Scan'}</button>
      {!item && <p className="muted">No item selected.</p>}
      {error && <p className="bad">{error}</p>}
      {data && (
        <div style={{marginTop:12}}>
          {Object.entries(data).map(([market,vals])=>(
            <div key={market} className="card" style={{margin:'12px 0'}}>
              <strong>{market}</strong>
              <div className="mono">Recent: ${vals.recentLow} – ${vals.recentHigh} · Median: ${vals.median}</div>
              <div className="muted">Sell-through: {(vals.sellThrough*100).toFixed(0)}%</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
