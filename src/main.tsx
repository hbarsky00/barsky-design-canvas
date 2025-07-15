
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppFresh from './AppFresh.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppFresh />
  </StrictMode>,
)
