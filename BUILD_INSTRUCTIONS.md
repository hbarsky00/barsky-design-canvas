# Pure SSG Build Instructions

## Pure Static Site Generation (SSG)

This project is configured for pure static site generation with no server-side rendering (SSR).

### Build Commands:

**Development build:**
```bash
npm run build:dev
```

**Production build (Pure SSG):**
```bash
vite build
```

### What this does:

1. **Builds React app** into `dist/` folder as pure static files
2. **Generates static HTML** with client-side hydration
3. **Creates optimized bundles** with proper chunking
4. **No server required** - serves from any static hosting

### Benefits:

- ✅ **Pure static files** - no server dependencies
- ✅ **Fast builds** - no complex prerendering
- ✅ **Easy deployment** - works on any static host
- ✅ **Better performance** - optimized static assets
- ✅ **SEO friendly** - proper meta tags via React Helmet

### Architecture:

- **Client-side routing** with React Router
- **Static HTML shell** with JavaScript hydration
- **Wrapped browser APIs** for build-time safety
- **Semantic HTML** with proper meta tags

### Deployment:

Upload the entire `dist/` folder to any static hosting provider (Netlify, Vercel, S3, etc.).

### Browser API Safety:

All browser APIs (window, document, localStorage, etc.) are properly wrapped with:
```javascript
if (typeof window !== 'undefined') {
  // browser API usage
}
```

This ensures the app builds successfully and runs properly in both build and runtime environments.