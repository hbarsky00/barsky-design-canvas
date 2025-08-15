
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from "vite-plugin-prerender";

// Import routes dynamically in production
const getRoutes = async () => {
  if (process.env.NODE_ENV === 'production') {
    const routesModule = await import('./scripts/prerender-routes.mjs');
    return routesModule.default;
  }
  return ['/'];
};

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const routes = await getRoutes();
  
  return {
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
      mode === 'production' && prerender({
        staticDir: "dist",
        routes,
        renderAfterDocumentEvent: "app-rendered",
        minify: true
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
  };
});
