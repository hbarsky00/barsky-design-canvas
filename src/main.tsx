
import React from "react";
import { createRoot } from "react-dom/client";

// Import Roboto font for Material Design 3.0
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import App from "./App.tsx";
import "./index.css";

// Only log startup, no aggressive cache clearing
console.log('🚀 App starting at:', new Date().toISOString());

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Dispatch event for prerender after first render
queueMicrotask(() => {
  document.dispatchEvent(new Event("app-rendered"));
});
