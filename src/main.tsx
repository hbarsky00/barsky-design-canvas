
import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";
import "./index.css";

// Only log startup, no aggressive cache clearing
console.log('🚀 App starting at:', new Date().toISOString());

const root = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// For SSG - always use createRoot since we're not doing SSR
createRoot(root).render(app);
