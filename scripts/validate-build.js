
import fs from 'fs';
import path from 'path';

console.log('🔍 Validating build for SEO compliance...');

const DIST_DIR = 'dist';
let allValid = true;

// Check if dist directory exists
if (!fs.existsSync(DIST_DIR)) {
  console.error('❌ Build directory not found');
  process.exit(1);
}

// Routes to validate
const routesToCheck = [
  { route: '/', file: 'index.html' },
  { route: '/projects', file: 'projects/index.html' },
  { route: '/project/herbalink', file: 'project/herbalink/index.html' },
];

routesToCheck.forEach(({ route, file }) => {
  const filePath = path.join(DIST_DIR, file);
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Missing: ${file}`);
    allValid = false;
    return;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  
  // Check for required tags
  const hasOgTitle = html.includes('property="og:title"');
  const hasOgImage = html.includes('property="og:image"');
  const hasCanonical = html.includes('rel="canonical"');
  const hasTwitterCard = html.includes('name="twitter:card"');
  
  // Check if og:image is absolute HTTPS URL
  const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
  const hasAbsoluteImage = ogImageMatch && ogImageMatch[1].startsWith('https://');
  
  if (hasOgTitle && hasOgImage && hasCanonical && hasTwitterCard && hasAbsoluteImage) {
    console.log(`✅ ${route}: All SEO tags present and valid`);
  } else {
    console.error(`❌ ${route}: Missing or invalid SEO tags`);
    if (!hasOgTitle) console.error(`   - Missing og:title`);
    if (!hasOgImage) console.error(`   - Missing og:image`);
    if (!hasCanonical) console.error(`   - Missing canonical`);
    if (!hasTwitterCard) console.error(`   - Missing twitter:card`);
    if (!hasAbsoluteImage) console.error(`   - og:image not absolute HTTPS URL`);
    allValid = false;
  }
});

if (allValid) {
  console.log('\n🎉 Build validation passed!');
} else {
  console.log('\n❌ Build validation failed');
  process.exit(1);
}
