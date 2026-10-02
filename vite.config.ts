
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
    esbuild: {
      drop: mode === 'production' ? ['console', 'debugger'] : [],
      treeShaking: true,
    },
    reportCompressedSize: false,
    chunkSizeWarningLimit: 400,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
    exclude: []
  }
}));
