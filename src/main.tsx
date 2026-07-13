import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'
import './styles/brand-logo.css'
import './styles/nav-mobile.css'
import './styles/vhs.css'
import './styles/transition.css'
import './styles/videoteca.css'
import './styles/timeline.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
