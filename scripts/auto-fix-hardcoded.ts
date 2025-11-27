/**
 * Auto-fix Hardcoded Values
 * 
 * Automatically replaces hardcoded values with design tokens.
 */

import * as fs from 'fs';
import * as path from 'path';

interface Replacement {
  pattern: RegExp;
  replacement: string;
  description: string;
}

// Color replacements
const colorReplacements: Replacement[] = [
  // Common colors to CSS variables
  {
    pattern: /(?:background-color|backgroundColor):\s*['"]?#ffffff['"]?/gi,
    replacement: 'backgroundColor: "var(--color-background-primary)"',
    description: 'White background to primary background variable',
  },
  {
    pattern: /(?:color):\s*['"]?#000000['"]?/gi,
    replacement: 'color: "var(--color-text-primary)"',
    description: 'Black text to primary text variable',
  },
  {
    pattern: /(?:background-color|backgroundColor):\s*['"]?#0a0a0f['"]?/gi,
    replacement: 'backgroundColor: "var(--color-background-primary)"',
    description: 'Dark background to primary background variable',
  },
  // Tailwind class replacements for hardcoded colors
  {
    pattern: /className=["']([^"']*)bg-white([^"']*)['"]/g,
    replacement: 'className="$1bg-background-primary$2"',
    description: 'bg-white to bg-background-primary',
  },
  {
    pattern: /className=["']([^"']*)text-black([^"']*)['"]/g,
    replacement: 'className="$1text-text-primary$2"',
    description: 'text-black to text-text-primary',
  },
  {
    pattern: /className=["']([^"']*)bg-gray-50([^"']*)['"]/g,
    replacement: 'className="$1bg-background-secondary$2"',
    description: 'bg-gray-50 to bg-background-secondary',
  },
];

// Spacing replacements (common hardcoded values to Tailwind)
const spacingReplacements: Replacement[] = [
  {
    pattern: /(?:padding):\s*['"]?16px['"]?/gi,
    replacement: 'padding: "var(--spacing-4)"',
    description: '16px padding to spacing-4',
  },
  {
    pattern: /(?:margin):\s*['"]?16px['"]?/gi,
    replacement: 'margin: "var(--spacing-4)"',
    description: '16px margin to spacing-4',
  },
  {
    pattern: /(?:padding):\s*['"]?32px['"]?/gi,
    replacement: 'padding: "var(--spacing-8)"',
    description: '32px padding to spacing-8',
  },
  {
    pattern: /(?:margin):\s*['"]?32px['"]?/gi,
    replacement: 'margin: "var(--spacing-8)"',
    description: '32px margin to spacing-8',
  },
];

let totalReplacements = 0;
const fileChanges: Record<string, number> = {};

function applyFixes(filePath: string, dryRun: boolean = false): number {
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacements = 0;
  const originalContent = content;

  // Apply color replacements
  colorReplacements.forEach(({ pattern, replacement, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      replacements += matches.length;
    }
  });

  // Apply spacing replacements
  spacingReplacements.forEach(({ pattern, replacement, description }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      replacements += matches.length;
    }
  });

  if (replacements > 0 && !dryRun && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    fileChanges[filePath] = replacements;
  }

  return replacements;
}

function processDirectory(dir: string, dryRun: boolean = false) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath, dryRun);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      const count = applyFixes(filePath, dryRun);
      totalReplacements += count;
    }
  });
}

// Main execution
const dryRun = process.argv.includes('--dry-run');

console.log(`🔧 Auto-fixing hardcoded values (${dryRun ? 'DRY RUN' : 'APPLY'})\n`);

const appDir = path.join(process.cwd(), 'app');
const componentsDir = path.join(process.cwd(), 'components');

if (fs.existsSync(appDir)) {
  console.log('Processing app/...');
  processDirectory(appDir, dryRun);
}

if (fs.existsSync(componentsDir)) {
  console.log('Processing components/...');
  processDirectory(componentsDir, dryRun);
}

console.log('\n✅ Auto-fix complete!\n');
console.log(`📊 Total replacements: ${totalReplacements}`);
console.log(`📁 Files changed: ${Object.keys(fileChanges).length}`);

if (Object.keys(fileChanges).length > 0) {
  console.log('\n📝 Changes by file:');
  Object.entries(fileChanges).forEach(([file, count]) => {
    const relPath = path.relative(process.cwd(), file);
    console.log(`   ${relPath}: ${count} replacements`);
  });
}

if (dryRun) {
  console.log('\n💡 This was a dry run. Run without --dry-run to apply changes.');
}


