#!/usr/bin/env node
/*
  Emergency no-op prerender script
  Purpose: Allow `npm run build` to succeed without SSG/prerender.
  This intentionally does nothing and exits successfully.
*/
console.log('[build] Skipping SSG/prerender — building SPA only.');
process.exit(0);

