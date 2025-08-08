import { useState, useEffect } from "react";

export default function GoalTracker(){
  const [goal,setGoal]=useState(()=>localStorage.getItem("goal")||"Buy a house");
  const [target,setTarget]=useState(()=>Number(localStorage.getItem("goal_target")||50000));
  const [progress,setProgress]=useState(()=>Number(localStorage.getItem("goal_progress")||3500));

  useEffect(()=>{
    localStorage.setItem("goal",goal);
    localStorage.setItem("goal_target",String(target));
    localStorage.setItem("goal_progress",String(progress));
  },[goal,target,progress]);

  const pct = Math.min(100, Math.round((progress/Math.max(1,target))*100));

  return (
    <div className="card">
      <div className="title">Goal Tracker</div>
      <div className="sub">Set a goal and track progress from barters, sales, and savings.</div>
      <div className="row">
        <div><label>Goal</label><input value={goal} onChange={e=>setGoal(e.target.value)} /></div>
        <div><label>Target ($)</label><input type="number" value={target} onChange={e=>setTarget(Number(e.target.value))} /></div>
        <div><label>Progress ($)</label><input type="number" value={progress} onChange={e=>setProgress(Number(e.target.value))} /></div>
      </div>
      <div style={{marginTop:12}}>
        <div style={{height:14, background:"#0b1222", border:"1px solid #1f2937", borderRadius:8}}>
          <div style={{width:`${pct}%`, height:"100%", borderRadius:8, background:"linear-gradient(90deg,#2563eb,#22c55e)"}} />
        </div>
        <div className="muted" style={{marginTop:6}}>{pct}% toward {goal}</div>
      </div>
    </div>
  );
}