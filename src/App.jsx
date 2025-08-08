import { NavLink, Outlet } from "react-router-dom";

const tabStyle = ({ isActive }) => ({
  padding: "10px 14px",
  textDecoration: "none",
  borderBottom: isActive ? "2px solid #111" : "2px solid transparent"
});

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 16, borderBottom: "1px solid #eee" }}>
        <NavLink to="/" style={tabStyle} end>Deals</NavLink>
        <NavLink to="/inventory" style={tabStyle}>Inventory</NavLink>
        <NavLink to="/lab" style={tabStyle}>Arbitrage Lab</NavLink>
      </nav>
      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}
