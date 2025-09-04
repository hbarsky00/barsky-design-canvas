/**
 * SEO Build Validation Script
 * Validates that the production build has proper SEO tags
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

function validateSEOBuild() {
  console.log('🔍 Validating SEO in production build...');
  
  // Check if dist exists
  if (!existsSync(distDir)) {
    console.log('⚠️  No dist/ folder found. Run "npm run build" first.');
    return false;
  }

  // Check main index.html
  const indexPath = join(distDir, 'index.html');
  if (!existsSync(indexPath)) {
    console.log('❌ No index.html found in dist/');
    return false;
  }

  const indexHTML = readFileSync(indexPath, 'utf-8');
  
  // Essential SEO elements
  const checks = [
    {
      name: 'Title tag',
      test: /<title>[^<]+<\/title>/i,
      required: true
    },
    {
      name: 'Meta description',
      test: /<meta[^>]+name=["']description["'][^>]+content=["'][^"']+["']/i,
      required: true
    },
    {
      name: 'Canonical URL',
      test: /<link[^>]+rel=["']canonical["'][^>]+href=["']https:\/\/barskydesign\.pro/i,
      required: true
    },
    {
      name: 'OG Title',
      test: /<meta[^>]+property=["']og:title["'][^>]+content=["'][^"']+["']/i,
      required: true
    },
    {
      name: 'OG Description',
      test: /<meta[^>]+property=["']og:description["'][^>]+content=["'][^"']+["']/i,
      required: true
    },
    {
      name: 'OG Image',
      test: /<meta[^>]+property=["']og:image["'][^>]+content=["']https:\/\/[^"']+["']/i,
      required: true
    },
    {
      name: 'Twitter Card',
      test: /<meta[^>]+name=["']twitter:card["'][^>]+content=["'][^"']+["']/i,
      required: true
    },
    {
      name: 'Structured Data',
      test: /<script[^>]+type=["']application\/ld\+json["'][^>]*>/i,
      required: true
    }
  ];

  let passed = 0;
  let failed = 0;

  console.log('\n📋 SEO Element Check:');
  console.log('=' + '='.repeat(50));

  checks.forEach(check => {
    const result = check.test.test(indexHTML);
    if (result) {
      console.log(`✅ ${check.name}`);
      passed++;
    } else {
      console.log(`${check.required ? '❌' : '⚠️'} ${check.name}`);
      if (check.required) failed++;
    }
  });

  // Extract and display actual values
  console.log('\n📄 Actual SEO Values:');
  console.log('=' + '='.repeat(50));

  const titleMatch = indexHTML.match(/<title>([^<]+)<\/title>/i);
  const descMatch = indexHTML.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const canonicalMatch = indexHTML.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i);

  console.log(`📝 Title: ${titleMatch?.[1] || 'NOT FOUND'}`);
  console.log(`📄 Description: ${descMatch?.[1]?.substring(0, 80)}...` || 'NOT FOUND');
  console.log(`🔗 Canonical: ${canonicalMatch?.[1] || 'NOT FOUND'}`);

  // Summary
  console.log('\n🎯 Summary:');
  console.log('=' + '='.repeat(50));
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed === 0) {
    console.log('\n🎉 All essential SEO elements are present in the build!');
    console.log('👍 Ready for production deployment.');
    return true;
  } else {
    console.log('\n⚠️  Some essential SEO elements are missing.');
    console.log('🔧 Fix these issues before deploying to production.');
    return false;
  }
}

// Run validation
const isValid = validateSEOBuild();
process.exit(isValid ? 0 : 1);