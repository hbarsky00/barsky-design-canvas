#!/usr/bin/env node
// Wrapper to support both CommonJS and ESM environments
(async () => {
  try {
    await import('./prerender.mjs');
  } catch (err) {
    console.error('Failed to run prerender.mjs:', err);
    process.exit(1);
  }
})();
