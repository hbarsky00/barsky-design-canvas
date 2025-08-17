
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
    // Add custom plugin to generate static SEO files AFTER build
    {
      name: 'generate-static-seo',
      writeBundle() {
        // Run after build completes to read from dist/index.html
        setTimeout(() => {
          try {
            const { spawn } = require('child_process');
            const child = spawn('node', ['scripts/generateStaticSEO.js'], { stdio: 'inherit' });
            child.on('close', (code: number | null) => {
              if (code === 0) {
                console.log('✅ Static SEO files generated successfully');
              } else {
                console.warn('⚠️ Static SEO generation failed with code:', code);
              }
            });
          } catch (error) {
            console.warn('Failed to generate static SEO files:', error);
          }
        }, 100); // Small delay to ensure dist files are written
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
