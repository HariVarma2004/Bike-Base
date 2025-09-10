import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AdminPage from './components/admin/Admin.jsx'
import './index.css'
import App from './App.jsx'
import  {BrowserRouter ,Route ,Routes}  from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
