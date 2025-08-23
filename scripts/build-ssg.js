#!/usr/bin/env node
/**
 * Simple SSG Build Script
 * Focuses on generating static files without SSR complexity
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🚀 Starting SSG build process...');

try {
  // Step 1: Clean and build client
  console.log('📦 Building client...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Step 2: Build server for prerendering
  console.log('🏗️ Building server for prerendering...');
  execSync('vite build --ssr src/entry-server.tsx --outDir dist/server', { stdio: 'inherit' });
  
  // Step 3: Run prerender
  console.log('📄 Prerendering pages...');
  execSync('node prerender', { stdio: 'inherit' });
  
  console.log('✅ SSG build completed successfully!');
  
  // Show build info
  const buildDir = path.resolve('dist');
  if (fs.existsSync(buildDir)) {
    const files = fs.readdirSync(buildDir);
    console.log(`📁 Generated ${files.length} files in dist/`);
  }
  
} catch (error) {
  console.error('❌ SSG build failed:', error);
  process.exit(1);
}