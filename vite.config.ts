
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
    // SEO generation temporarily disabled for Vercel compatibility
    // Will be re-enabled once deployment is stable
    ...(mode === 'development' ? [{
      name: 'generate-static-seo-dev',
      async buildStart() {
        try {
          const { spawn } = await import('child_process');
          spawn('node', ['scripts/generateStaticSEO.js'], { stdio: 'inherit' });
          console.log('Static SEO files generated (dev mode)');
        } catch (error) {
          console.warn('Failed to generate static SEO files:', error);
        }
      }
    }] : [])
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
