# Pre-rendered Build Instructions

## Option 2: Pre-rendering Implementation

React Snap has been configured to generate static HTML files for each route with proper canonical tags.

### Build Commands:

**Development build:**
```bash
npm run build:dev
```

**Production build with pre-rendering:**
```bash
npm run build
node scripts/build-with-prerender.js
```

**Or manually:**
```bash
vite build
npx react-snap
```

### What this does:

1. **Builds React app** into `dist/` folder
2. **Pre-renders routes** using Puppeteer to generate actual HTML files
3. **Creates HTML files** like:
   - `dist/index.html` (homepage)
   - `dist/projects/index.html` 
   - `dist/contact/index.html`
   - `dist/case-studies/herbalink-mobile-herbalist-ux-design/index.html`
   - etc.

### Benefits:

- ✅ **Real HTML files** with proper canonical tags in `<head>`
- ✅ **SEO crawlers** see correct canonicals immediately  
- ✅ **No JavaScript dependency** for canonical tags
- ✅ **Better Core Web Vitals** from static HTML

### Routes being pre-rendered:

- Homepage: `/`
- Projects: `/projects`
- Contact: `/contact` 
- About: `/about`
- Blog: `/blog`
- Services: `/services`
- Case studies: `/case-studies/*`
- Service pages: `/design-services/*`
- Store: `/store`
- Lead capture: `/get-started`
- Free audit: `/free-audit`
- Service pages: `/services/*`
- LinkedIn visitors: `/linkedin-visitors`

### Deployment:

Upload the entire `dist/` folder to your hosting provider. Each route will have its own HTML file with proper canonicals.