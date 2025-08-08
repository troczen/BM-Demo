export function seedMock(){
  return [
    { id: crypto.randomUUID(), title: 'Used iPad Air (64GB)', cost: 120, fmv: 220, tags: ['electronics','hot'], createdAt: Date.now()-20000 },
    { id: crypto.randomUUID(), title: 'Power Tools Lot', cost: 80, fmv: 180, tags: ['overstock','industrial'], createdAt: Date.now()-10000 },
  ]
}
