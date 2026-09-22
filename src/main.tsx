
import React from "react";
import { createRoot } from "react-dom/client";
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

// Deliberately createRoot, not hydrateRoot, even though the production HTML now
// ships a prerendered body (see scripts/capture-prerendered-bodies.ts).
//
// Every route in App.tsx is React.lazy behind a single Suspense. On first client
// render the route chunk hasn't loaded, so React renders the Suspense fallback —
// a spinner — while the prerendered markup is the finished page. That is a
// guaranteed mismatch, and hydrateRoot answered it with React #418 followed by
// #423: throw the server markup away and client-render anyway.
//
// So the work was happening regardless; hydrateRoot only added two console
// errors on top of it. createRoot does the same thing without pretending.
// Crawlers still get the real HTML, which is the point of prerendering here.
//
// To get genuine hydration, the route's lazy chunk has to be imported before
// this call — a path-to-module map awaited ahead of render. Worth doing; it is
// not a one-line change, so it isn't smuggled in here.
createRoot(root).render(app);
