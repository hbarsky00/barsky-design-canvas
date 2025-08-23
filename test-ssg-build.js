#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('🧪 Testing Pure SSG Build...');

try {
  // Clean any existing dist
  if (fs.existsSync('dist')) {
    fs.rmSync('dist', { recursive: true });
    console.log('✅ Cleaned existing dist folder');
  }

  // Run the pure SSG build
  console.log('🏗️ Running vite build (pure SSG)...');
  execSync('vite build', { stdio: 'inherit' });
  
  // Check if dist folder exists and contains files
  if (fs.existsSync('dist')) {
    const files = fs.readdirSync('dist');
    console.log(`✅ SSG Build successful! Generated ${files.length} files:`);
    files.forEach(file => console.log(`  - ${file}`));
    
    // Check if index.html exists
    if (fs.existsSync('dist/index.html')) {
      console.log('✅ Main index.html file generated successfully');
      
      // Read a small sample to verify it's not empty
      const indexContent = fs.readFileSync('dist/index.html', 'utf-8');
      if (indexContent.length > 100) {
        console.log('✅ Index.html has content (not empty)');
      } else {
        console.warn('⚠️ Index.html seems to be too small');
      }
    } else {
      console.error('❌ index.html not found in dist folder');
    }
  } else {
    console.error('❌ dist folder not created');
  }
  
  console.log('\n🎉 Pure SSG Build Test Complete!');
  
} catch (error) {
  console.error('❌ SSG Build failed:', error.message);
  process.exit(1);
}