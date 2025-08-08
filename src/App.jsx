import { NavLink } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";

const link = ({ isActive }) => ({
  display:"block", padding:"10px 12px", borderRadius:8,
  background: isActive ? "#0b1222" : "transparent",
  border: "1px solid #1f2937", marginBottom:8, textDecoration:"none", color:"#e5e7eb"
});

export default function App(){
  return (
    <div style={{display:"grid", gridTemplateColumns:"240px 1fr", minHeight:"100vh"}}>
      <aside style={{padding:16, borderRight:"1px solid #1f2937", background:"#0f172a"}}>
        <div style={{fontWeight:700, marginBottom:12}}>Barter OS</div>
        <NavLink to="/" style={link} end>Dashboard</NavLink>
        {/* Future: add direct links to subsections with #anchors */}
        <div className="muted" style={{marginTop:16, fontSize:12}}>Tip: Use the Dashboard cards. Tabs are no longer needed.</div>
      </aside>
      <main>
        <Dashboard />
      </main>
    </div>
  );
}
