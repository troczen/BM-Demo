// Mock multi-market scanner: given item.fmv, synthesize ranges per market
function jitter(base, factor=0.2){
  const low = Math.max(1, Math.round(base*(1-factor)))
  const high = Math.round(base*(1+factor))
  const median = Math.round((low+high)/2)
  const sellThrough = Math.min(0.95, 0.35 + Math.random()*0.5)
  return { recentLow: low, recentHigh: high, median, sellThrough }
}
export async function mockScanMarkets(item){
  // simulate latency
  await new Promise(r=>setTimeout(r, 400))
  const base = item.fmv || 100
  return {
    'eBay': jitter(base, .18),
    'Craigslist': jitter(base, .22),
    'Facebook': jitter(base, .25)
  }
}
