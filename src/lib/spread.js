export function calcSpread({ cost, expectedSale, feesPct=0.12, holdingDays=7 }){
  const fees = expectedSale * feesPct
  const net = expectedSale - fees
  const netProfit = net - cost
  const grossSpread = (expectedSale - cost) / cost
  const netMargin = netProfit / expectedSale
  const dailyROI = (netProfit / cost) / Math.max(1, holdingDays)
  return { cost, expectedSale, fees, net, netProfit, grossSpread, netMargin, dailyROI }
}
