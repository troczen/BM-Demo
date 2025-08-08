import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import Deals from './pages/Deals.jsx'
import Inventory from './pages/Inventory.jsx'
import Lab from './pages/Lab.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Deals />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="lab" element={<Lab />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
