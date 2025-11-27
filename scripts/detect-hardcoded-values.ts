/**
 * Script to detect hardcoded values in app/ and components/
 * 
 * Finds:
 * - Hardcoded colors (#hex, rgb(), rgba())
 * - Hardcoded spacing (px, rem values)
 * - Hardcoded font sizes
 * - Hardcoded border radius
 */

import * as fs from 'fs';
import * as path from 'path';

interface HardcodedIssue {
  file: string;
  line: number;
  type: 'color' | 'spacing' | 'fontSize' | 'borderRadius';
  value: string;
  context: string;
}

const issues: HardcodedIssue[] = [];

// Patterns to detect
const patterns = {
  color: {
    hex: /#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\b/gi,
    rgb: /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+/gi,
    hsl: /hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%/gi,
  },
  spacing: {
    px: /(?:padding|margin|gap|top|left|right|bottom|width|height):\s*\d+px/gi,
    rem: /(?:padding|margin|gap|top|left|right|bottom|width|height):\s*\d+(\.\d+)?rem/gi,
  },
  fontSize: {
    px: /font-size:\s*\d+px/gi,
    rem: /font-size:\s*\d+(\.\d+)?rem/gi,
  },
  borderRadius: {
    px: /border-radius:\s*\d+px/gi,
    rem: /border-radius:\s*\d+(\.\d+)?rem/gi,
  },
};

// Exceptions (allowed hardcoded values)
const exceptions = [
  'opacity', 'z-index', 'transform', 'transition',
  'rgba(0, 0, 0, 0)', 'rgb(0, 0, 0)', '#000', '#fff',
  '0px', '0rem', '100%', 'auto', 'inherit',
];

function shouldIgnore(value: string, context: string): boolean {
  // Ignore if in comment
  if (context.trim().startsWith('//') || context.trim().startsWith('/*')) {
    return true;
  }

  // Ignore if it's an exception
  return exceptions.some(exc => value.includes(exc));
}

function scanFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    // Check for hardcoded colors
    Object.entries(patterns.color).forEach(([type, pattern]) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        if (!shouldIgnore(match[0], line)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            type: 'color',
            value: match[0],
            context: line.trim(),
          });
        }
      }
    });

    // Check for hardcoded spacing
    Object.entries(patterns.spacing).forEach(([type, pattern]) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        if (!shouldIgnore(match[0], line)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            type: 'spacing',
            value: match[0],
            context: line.trim(),
          });
        }
      }
    });

    // Check for hardcoded font sizes
    Object.entries(patterns.fontSize).forEach(([type, pattern]) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        if (!shouldIgnore(match[0], line)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            type: 'fontSize',
            value: match[0],
            context: line.trim(),
          });
        }
      }
    });

    // Check for hardcoded border radius
    Object.entries(patterns.borderRadius).forEach(([type, pattern]) => {
      const matches = line.matchAll(pattern);
      for (const match of matches) {
        if (!shouldIgnore(match[0], line)) {
          issues.push({
            file: filePath,
            line: lineNumber,
            type: 'borderRadius',
            value: match[0],
            context: line.trim(),
          });
        }
      }
    });
  });
}

function scanDirectory(dir: string, extensions: string[] = ['.tsx', '.ts', '.css']) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      scanDirectory(filePath, extensions);
    } else if (extensions.some(ext => file.endsWith(ext))) {
      scanFile(filePath);
    }
  });
}

// Scan directories
console.log('🔍 Scanning for hardcoded values...\n');

const appDir = path.join(process.cwd(), 'app');
const componentsDir = path.join(process.cwd(), 'components');

if (fs.existsSync(appDir)) {
  console.log('Scanning app/...');
  scanDirectory(appDir);
}

if (fs.existsSync(componentsDir)) {
  console.log('Scanning components/...');
  scanDirectory(componentsDir);
}

// Generate report
console.log('\n📊 HARDCODED VALUES REPORT\n');
console.log('='.repeat(80));

const groupedByType = issues.reduce((acc, issue) => {
  if (!acc[issue.type]) {
    acc[issue.type] = [];
  }
  acc[issue.type]!.push(issue);
  return acc;
}, {} as Record<string, HardcodedIssue[]>);

Object.entries(groupedByType).forEach(([type, typeIssues]) => {
  console.log(`\n${type.toUpperCase()}: ${typeIssues.length} issues`);
  console.log('-'.repeat(80));

  // Group by file
  const byFile = typeIssues.reduce((acc, issue) => {
    const relPath = path.relative(process.cwd(), issue.file);
    if (!acc[relPath]) {
      acc[relPath] = [];
    }
    acc[relPath].push(issue);
    return acc;
  }, {} as Record<string, HardcodedIssue[]>);

  Object.entries(byFile).forEach(([file, fileIssues]) => {
    console.log(`\n  📄 ${file}`);
    fileIssues.slice(0, 5).forEach(issue => {
      console.log(`     Line ${issue.line}: ${issue.value}`);
      console.log(`     → ${issue.context.substring(0, 60)}...`);
    });
    if (fileIssues.length > 5) {
      console.log(`     ... and ${fileIssues.length - 5} more`);
    }
  });
});

console.log('\n' + '='.repeat(80));
console.log(`\n📈 SUMMARY:`);
console.log(`   Total issues: ${issues.length}`);
console.log(`   Colors: ${groupedByType.color?.length || 0}`);
console.log(`   Spacing: ${groupedByType.spacing?.length || 0}`);
console.log(`   Font sizes: ${groupedByType.fontSize?.length || 0}`);
console.log(`   Border radius: ${groupedByType.borderRadius?.length || 0}`);
console.log();

// Save report to file
const reportPath = path.join(process.cwd(), 'docs', '09-TESTES', 'HARDCODED_VALUES_REPORT.md');
const reportContent = `# 🔍 Hardcoded Values Report

Generated: ${new Date().toISOString()}

## Summary

- **Total issues:** ${issues.length}
- **Colors:** ${groupedByType.color?.length || 0}
- **Spacing:** ${groupedByType.spacing?.length || 0}
- **Font sizes:** ${groupedByType.fontSize?.length || 0}
- **Border radius:** ${groupedByType.borderRadius?.length || 0}

## Details by Type

${Object.entries(groupedByType).map(([type, typeIssues]) => `
### ${type.toUpperCase()} (${typeIssues.length} issues)

${Object.entries(typeIssues.reduce((acc, issue) => {
  const relPath = path.relative(process.cwd(), issue.file);
  if (!acc[relPath]) {
    acc[relPath] = [];
  }
  acc[relPath].push(issue);
  return acc;
}, {} as Record<string, HardcodedIssue[]>)).map(([file, fileIssues]) => `
#### \`${file}\`

${fileIssues.map(issue => `
- **Line ${issue.line}:** \`${issue.value}\`
  \`\`\`
  ${issue.context}
  \`\`\`
`).join('\n')}
`).join('\n')}
`).join('\n')}

## Recommendations

1. Replace hardcoded colors with:
   - CSS variables: \`var(--color-brand-primary)\`
   - Tailwind classes: \`bg-brand text-text-primary\`

2. Replace hardcoded spacing with:
   - Tailwind classes: \`p-4 m-8 gap-2\`
   - CSS variables: \`var(--spacing-4)\`

3. Replace hardcoded font sizes with:
   - Tailwind classes: \`text-lg text-xl\`
   - CSS variables: \`var(--font-size-lg)\`

4. Replace hardcoded border radius with:
   - Tailwind classes: \`rounded-md rounded-lg\`
   - CSS variables: \`var(--radius-md)\`
`;

fs.writeFileSync(reportPath, reportContent);
console.log(`📝 Report saved to: ${path.relative(process.cwd(), reportPath)}`);


