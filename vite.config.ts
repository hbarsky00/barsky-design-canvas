
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { PrerenderSPAPlugin } from "vite-plugin-prerender";

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
    mode === 'development' &&
    componentTagger(),
    mode === 'production' && PrerenderSPAPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: [
        '/',
        '/projects',
        '/services', 
        '/about',
        '/contact',
        '/blog',
        '/project/herbalink',
        '/project/business-management',
        '/project/splittime',
        '/project/investor-loan-app',
        '/project/medication-app',
        '/project/gold2crypto',
        '/project/dae-search',
        '/project/barskyjoint',
        '/project/wholesale-distribution'
      ],
      renderer: '@prerenderer/renderer-puppeteer',
      rendererOptions: {
        headless: true,
        renderAfterDocumentEvent: 'render-event',
        renderAfterTime: 2000
      }
    })
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
