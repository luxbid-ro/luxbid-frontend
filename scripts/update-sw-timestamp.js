#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 [BUILD] Updating Service Worker DEPLOY_TIMESTAMP...');

const swPath = path.join(__dirname, '../public/sw.js');
const deployTimestamp = Date.now();

try {
  let swContent = fs.readFileSync(swPath, 'utf8');
  
  // Replace the DEPLOY_TIMESTAMP with current build time
  swContent = swContent.replace(
    /const DEPLOY_TIMESTAMP = \d+/,
    `const DEPLOY_TIMESTAMP = ${deployTimestamp}`
  );
  
  fs.writeFileSync(swPath, swContent);
  
  console.log(`✅ [BUILD] Service Worker updated with timestamp: ${deployTimestamp}`);
  console.log(`📅 [BUILD] Build time: ${new Date(deployTimestamp).toISOString()}`);
} catch (error) {
  console.error('❌ [BUILD] Failed to update Service Worker timestamp:', error);
  process.exit(1);
}
