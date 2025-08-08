import { useState, useEffect } from "react";

export default function ExchangeAccounts(){
  const [rows,setRows]=useState(()=>JSON.parse(localStorage.getItem("exchanges")||"[]"));
  const [name,setName]=useState("");
  const [memberId,setMemberId]=useState("");
  const [balance,setBalance]=useState("");

  useEffect(()=>{ localStorage.setItem("exchanges", JSON.stringify(rows)); },[rows]);

  const add=()=>{
    if(!name.trim()) return;
    setRows(prev=>[{id:crypto.randomUUID(), name, memberId, balance:Number(balance||0)}, ...prev]);
    setName(""); setMemberId(""); setBalance("");
  };
  const remove=(id)=> setRows(prev=>prev.filter(r=>r.id!==id));

  return (
    <div className="card">
      <div className="title">Trade Exchange Accounts</div>
      <p className="sub">Track memberships/balances (manual for now; APIs added later only if available).</p>
      <div className="row">
        <div><label>Exchange</label><input value={name} onChange={e=>setName(e.target.value)} placeholder="iTex, Tradebank, BizX, DoBarter, Nextrade360" /></div>
        <div><label>Member ID</label><input value={memberId} onChange={e=>setMemberId(e.target.value)} /></div>
        <div><label>Balance (credits)</label><input type="number" value={balance} onChange={e=>setBalance(e.target.value)} /></div>
      </div>
      <button className="btn" style={{marginTop:8}} onClick={add}>Add Exchange</button>
      <div className="card" style={{marginTop:12}}>
        <table style={{width:"100%"}}>
          <thead><tr><th>Exchange</th><th>Member ID</th><th>Balance</th><th></th></tr></thead>
          <tbody>
            {rows.map(r=>(
              <tr key={r.id}>
                <td>{r.name}</td><td>{r.memberId}</td><td>{r.balance}</td>
                <td><button className="btn" onClick={()=>remove(r.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}