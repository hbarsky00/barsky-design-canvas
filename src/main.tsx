import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./cache-buster";
import "./index.css";

// FORCE COMPLETE CACHE BUST - this timestamp will force Vite to rebuild everything
const CACHE_BUST = Date.now();
console.log('🚀 Force rebuilding with cache bust:', CACHE_BUST);

// Clear all possible caches before app start
if (typeof window !== 'undefined') {
  // Clear localStorage and sessionStorage
  try {
    localStorage.clear();
    sessionStorage.clear();
    console.log('🧹 Cleared browser storage');
  } catch (e) {
    console.warn('Could not clear storage:', e);
  }
  
  // Clear any cached modules by forcing a hard refresh if this is a reload
  if (performance.navigation && performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    console.log('🔄 Detected reload - forcing hard refresh');
    window.location.reload();
  }
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);