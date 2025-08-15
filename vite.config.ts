
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Static routes list for future prerendering
const routes = [
  "/",
  "/projects", 
  "/services",
  "/about",
  "/contact",
  "/blog",
  
  // Project case studies
  "/project/herbalink",
  "/project/splittime", 
  "/project/business-management",
  "/project/investor-loan-app",
  "/project/medication-app",
  "/project/gold2crypto",
  "/project/dae-search",
  "/project/barskyjoint",
  "/project/wholesale-distribution"
];

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    headers: {
      'Cache-Control': 'no-cache',
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
    // TODO: Add prerender plugin back when ES module issues are resolved
  ].filter(Boolean),
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
          ui: ['framer-motion', 'lucide-react'],
        }
      }
    },
    sourcemap: false,
    minify: 'esbuild',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  }
}));
