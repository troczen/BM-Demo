import GoalTracker from "../components/GoalTracker.jsx";
import ListingHelper from "../components/ListingHelper.jsx";
import ExchangeAccounts from "../components/ExchangeAccounts.jsx";
import CostCalculator from "./CostCalculator.jsx";
import HavesWants from "./HavesWants.jsx";

export default function Dashboard(){
  return (
    <div className="shell grid" style={{gap:24}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h1 style={{margin:0}}>Barter OS Dashboard</h1>
          <p className="sub">Found.com-style layout: live cards with calculators, intake, and quick listing helper.</p>
        </div>
      </header>

      <section className="grid">
        <GoalTracker />
      </section>

      <section className="grid cards">
        <ListingHelper />
        <ExchangeAccounts />
      </section>

      <section className="grid cards">
        <CostCalculator />
        <HavesWants />
      </section>
    </div>
  );
}