#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏗️  Building React app...');
execSync('vite build', { stdio: 'inherit' });

console.log('📸 Pre-rendering routes with react-snap...');
execSync('npx react-snap', { stdio: 'inherit' });

console.log('✅ Build complete with pre-rendered HTML files!');

// Verify pre-rendered files
const distDir = 'dist';
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir, { recursive: true });
  const htmlFiles = files.filter(file => file.endsWith('index.html'));
  console.log(`📄 Generated ${htmlFiles.length} HTML files:`, htmlFiles);
}