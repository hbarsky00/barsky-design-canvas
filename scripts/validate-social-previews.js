
import fs from 'fs';
import path from 'path';

const DIST_DIR = 'dist';
const BASE_URL = 'https://barskydesign.pro';

console.log('🔍 Validating social media previews...');

const requiredMetaTags = [
  'og:title',
  'og:description', 
  'og:image',
  'og:url',
  'og:type',
  'twitter:card',
  'twitter:title',
  'twitter:description',
  'twitter:image'
];

function validateHtmlFile(filePath, route) {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ File not found: ${filePath}`);
    return false;
  }

  const html = fs.readFileSync(filePath, 'utf8');
  const missingTags = [];
  let isValid = true;

  // Check for required meta tags
  requiredMetaTags.forEach(tag => {
    const property = tag.startsWith('og:') ? 'property' : 'name';
    const regex = new RegExp(`<meta\\s+${property}="${tag}"[^>]*content="[^"]+"`);
    
    if (!regex.test(html)) {
      missingTags.push(tag);
      isValid = false;
    }
  });

  // Check image dimensions and format
  const ogImageMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
  if (ogImageMatch) {
    const imageUrl = ogImageMatch[1];
    if (!imageUrl.startsWith('https://')) {
      console.warn(`⚠️  ${route}: og:image should use HTTPS - ${imageUrl}`);
    }
    
    // Check for proper image dimensions meta
    if (!html.includes('property="og:image:width"') || !html.includes('property="og:image:height"')) {
      console.warn(`⚠️  ${route}: Missing og:image dimensions`);
    }
  }

  // Check canonical URL
  const canonicalMatch = html.match(/rel="canonical"\s+href="([^"]+)"/);
  if (!canonicalMatch) {
    console.error(`❌ ${route}: Missing canonical URL`);
    isValid = false;
  } else if (!canonicalMatch[1].startsWith(BASE_URL)) {
    console.error(`❌ ${route}: Canonical URL should start with ${BASE_URL}`);
    isValid = false;
  }

  if (isValid) {
    console.log(`✅ ${route}: All social media tags present`);
  } else {
    console.error(`❌ ${route}: Missing tags - ${missingTags.join(', ')}`);
  }

  return isValid;
}

// Validate key routes
const routesToValidate = [
  { route: '/', file: 'index.html' },
  { route: '/projects', file: 'projects/index.html' },
  { route: '/contact', file: 'contact/index.html' },
  { route: '/project/herbalink', file: 'project/herbalink/index.html' },
  { route: '/project/splittime', file: 'project/splittime/index.html' },
];

let allValid = true;

routesToValidate.forEach(({ route, file }) => {
  const filePath = path.join(DIST_DIR, file);
  const isValid = validateHtmlFile(filePath, route);
  if (!isValid) allValid = false;
});

if (allValid) {
  console.log('\n🎉 All social media previews are properly configured!');
  
  console.log('\n📋 Next steps:');
  console.log('1. Deploy your site');
  console.log('2. Test URLs with:');
  console.log('   - Facebook Debugger: https://developers.facebook.com/tools/debug/');
  console.log('   - LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/');
  console.log('   - Twitter Card Validator: https://cards-dev.twitter.com/validator');
} else {
  console.log('\n❌ Some social media previews need attention. Fix the issues above and run validation again.');
  process.exit(1);
}
