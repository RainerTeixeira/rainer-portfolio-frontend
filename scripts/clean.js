// Simple cross-platform clean script for Next.js build artifacts
// Removes: .next, out, dist, coverage, .turbo, node_modules/.cache

const fs = require('fs');
const path = require('path');

const targets = [
  '.next',
  'out',
  'dist',
  'coverage',
  '.turbo',
  path.join('node_modules', '.cache'),
];

for (const target of targets) {
  const fullPath = path.resolve(__dirname, '..', target);
  try {
    if (fs.existsSync(fullPath)) {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`[clean] Removed ${fullPath}`);
    }
  } catch (err) {
    console.warn(`[clean] Failed to remove ${fullPath}:`, err.message);
  }
}
