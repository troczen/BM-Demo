import React, { useState } from 'react'

export default function InventoryForm({onAdd}){
  const [title,setTitle]=useState('')
  const [cost,setCost]=useState(25)
  const [fmv,setFmv]=useState(80)
  const [tags,setTags]=useState('electronics,overstock')
  const add=()=>{
    if(!title.trim()) return
    const item={
      id: crypto.randomUUID(),
      title, cost: Number(cost), fmv: Number(fmv),
      tags: tags.split(',').map(s=>s.trim()).filter(Boolean),
      createdAt: Date.now()
    }
    onAdd(item)
    setTitle(''); setCost(25); setFmv(80); setTags('electronics,overstock')
  }
  return (
    <div className="grid" style={{gap:10}}>
      <div>
        <label>Title</label>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Ex: Nintendo Switch (used)" />
      </div>
      <div className="row">
        <div>
          <label>Cost Basis ($)</label>
          <input type="number" value={cost} onChange={e=>setCost(e.target.value)} />
        </div>
        <div>
          <label>FMV Guess ($)</label>
          <input type="number" value={fmv} onChange={e=>setFmv(e.target.value)} />
        </div>
      </div>
      <div>
        <label>Tags (comma separated)</label>
        <input value={tags} onChange={e=>setTags(e.target.value)} />
      </div>
      <div>
        <button className="btn" onClick={add}>Add Item</button>
      </div>
    </div>
  )
}
