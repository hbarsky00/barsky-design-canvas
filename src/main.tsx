
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import TestApp from './TestApp.tsx'

createRoot(document.getElementById('root')!).render(
  <TestApp />
)
