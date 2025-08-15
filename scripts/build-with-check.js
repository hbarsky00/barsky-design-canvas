
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the normal build
console.log('Building project...');
execSync('vite build', { stdio: 'inherit' });

// Run SEO validation check
console.log('Running SEO validation...');
try {
  execSync('node scripts/check-meta.mjs', { stdio: 'inherit' });
  console.log('✅ SEO validation passed!');
} catch (error) {
  console.error('❌ SEO validation failed!');
  process.exit(1);
}
