import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./utils/clearProjectCache";

// Force cache busting to prevent module loading errors
const timestamp = Date.now();
console.log('🔄 App loading with cache bust:', timestamp);

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);