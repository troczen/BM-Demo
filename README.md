# Barter Mastery Demo (Client-Only)

A live-preview friendly demo of the Barter Mastery app (arbitrage-focused) built with Vite + React.
No backend required for the demo. Replace mock adapters with real APIs later.

## Run locally
```bash
npm install
npm run dev
# open http://localhost:5173
```

## Run on Replit / CodeSandbox / StackBlitz
- Create a new Vite React project or import this repo.
- Ensure Node 18+ runtime.
- Use default start command: `npm run dev`.

## What’s inside
- Inventory entry
- Mock multi-market scanner (eBay/Craigslist/Facebook)
- Spread & ROI calculator
- 3-leg "Pyramid" arbitrage finder
- SVG flow diagram

## Replace mocks with real adapters
- Create server adapters for eBay, Craigslist proxy, and Facebook Graph API.
- Pipe results into the same shape used by `mockScanMarkets`.
