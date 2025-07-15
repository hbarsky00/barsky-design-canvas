
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppFresh from './AppFresh.tsx'
// Temporarily remove CSS import to isolate issues
// import './index.css'

createRoot(document.getElementById('root')!).render(
  <AppFresh />
)
