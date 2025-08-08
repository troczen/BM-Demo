// Extremely simplified 3-leg arbitrage finder using market medians
export function findThreeLegPath({ item, markets, minProfit=0.25 }){
  if(!item || !markets) return null
  const entries = Object.entries(markets).map(([market,v])=>({market, ...v})).sort((a,b)=>b.median-a.median)
  if(entries.length<2) return null

  // Step1: pick a market that values A slightly above cost (simulate trade premium)
  const step1 = entries[0] // choose highest median
  const valueAfterTrade = Math.round(step1.median * 0.95) // haircut for trade friction

  // Step2: exit in another market with best expected sale
  const step2 = entries[1] || entries[0]
  const exit = Math.round(Math.max(step1.median, step2.median) * 0.97) // fees-ish

  const netProfit = exit - item.cost
  const netMargin = netProfit / Math.max(exit,1)
  if(netMargin < minProfit) return null

  return {
    step1: { market: step1.market, to: 'Item B (higher demand)', value: valueAfterTrade },
    step2: { market: step2.market, exit },
    netMargin,
    notes: 'Simplified model. Replace with market-specific fee/latency & chain constraints.'
  }
}
