import React from 'react'

export default function FlowDiagram(){
  return (
    <svg viewBox="0 0 800 220" style={{width:'100%',height:'auto',background:'#0b1222',border:'1px solid #1f2937',borderRadius:12}}>
      <defs>
        <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#1f2937" />
          <stop offset="100%" stopColor="#0b1222" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="780" height="200" fill="url(#g)" rx="12" />
      <Box x={30}  y={70} w={160} text="Acquisition Source" />
      <Arrow x1={190} y1={110} x2={250} y2={110} />
      <Box x={250} y={70} w={140} text="Item A (undervalued)" />
      <Arrow x1={390} y1={110} x2={450} y2={110} />
      <Box x={450} y={30} w={140} text="Trade in Market 1 → Item B" />
      <Arrow x1={520} y1={70} x2={520} y2={150} vertical />
      <Box x={450} y={150} w={140} text="Sell/Trade in Market 2" />
      <Arrow x1={590} y1={110} x2={660} y2={110} />
      <Box x={660} y={70} w={110} text="Cash / Item C" />
    </svg>
  )
}

function Box({x,y,w=140,h=60,text}){
  return (
    <g>
      <rect x={x} y={y} width={w} height={60} fill="#0f172a" stroke="#334155" rx="10" />
      <text x={x+w/2} y={y+35} textAnchor="middle" fill="#e5e7eb" fontSize="12">{text}</text>
    </g>
  )
}
function Arrow({x1,y1,x2,y2,vertical}){
  const head = 6
  return vertical ? (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" />
      <polygon points={`${x2-6},${y2-6} ${x2+6},${y2-6} ${x2},${y2}`} fill="#64748b" />
    </g>
  ) : (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#64748b" />
      <polygon points={`${x2-6},${y2-6} ${x2-6},${y2+6} ${x2},${y2}`} fill="#64748b" />
    </g>
  )
}
