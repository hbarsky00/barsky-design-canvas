
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

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
    // Add custom plugin to generate static SEO files
    {
      name: 'generate-static-seo',
      writeBundle() {
        if (mode === 'production') {
          try {
            // Dynamic import to avoid TypeScript issues
            const { spawn } = require('child_process');
            spawn('node', ['scripts/generateStaticSEO.js'], { stdio: 'inherit' });
          } catch (error) {
            console.warn('Failed to generate static SEO files:', error);
          }
        }
      }
    }
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
    // Enable prerendering for project pages
    emptyOutDir: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion'],
  }
}));
