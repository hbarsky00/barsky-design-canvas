
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Cache-Control': 'no-cache',
    }
  },
  // `vite preview` hard-defaults to 4173 and ignores PORT, so when another
  // session already holds 4173 the launcher's reassigned port had nowhere to
  // land and the preview just failed to start. Read PORT here instead.
  preview: {
    host: "::",
    port: Number(process.env.PORT) || 4173,
  },
  plugins: [react()],
  // This used to live under `build.esbuild`, which is not a Vite option, so it
  // was parsed and silently ignored — 13 `console.log` calls were measured in
  // the shipped bundle on 2026-11-12, including seven that fire on every
  // case-study page and three on every image open. Vite reads `esbuild` at the
  // top level.
  //
  // `pure` rather than `drop: ['console']`: it marks these calls side-effect
  // free so the minifier removes them, while leaving console.error and
  // console.warn alone. Dropping those too would silence real failures in the
  // one place anyone would look for them.
  esbuild: {
    pure: mode === 'production' ? ['console.log', 'console.debug', 'console.info'] : [],
    drop: mode === 'production' ? ['debugger'] : [],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion'],
          icons: ['lucide-react'],
          // charts: recharts is in package.json but nothing in src/ imports it,
          // so this produced a 0 KB chunk that every page still requested.
          radix: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
        }
      }
    },
    cssCodeSplit: true,
    sourcemap: false,
    minify: 'esbuild',
    target: 'esnext',
    emptyOutDir: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 400,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: []
  }
}));
