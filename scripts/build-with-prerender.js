#!/usr/bin/env node
// Wrapper to support both CommonJS and ESM environments
(async () => {
  try {
    await import('./build-with-prerender.mjs');
  } catch (err) {
    console.error('Failed to run build-with-prerender.mjs:', err);
    process.exit(1);
  }
})();
