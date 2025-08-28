import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css'
import { animatedFavicon } from './utils/animatedFavicon.js'

// Initialize animated favicon
animatedFavicon.start(8) // 8 FPS for smooth animation without being too resource-heavy

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)