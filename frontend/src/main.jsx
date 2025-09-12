// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// This is your main.jsx - it should NOT wrap App with a Router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* No Router wrapper here! */}
  </StrictMode>
)