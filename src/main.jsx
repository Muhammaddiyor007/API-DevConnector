import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ContextBody } from './context/ContexApi.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextBody>
      <App />
    </ContextBody>
  </StrictMode>,
)
