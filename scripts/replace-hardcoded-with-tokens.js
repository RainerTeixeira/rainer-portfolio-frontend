/**
 * Script para identificar e substituir valores hardcoded por design tokens
 *
 * Este script:
 * 1. Identifica padrões hardcoded comuns
 * 2. Sugere substituições pelos tokens
 * 3. Pode aplicar as substituições automaticamente
 *
 * @fileoverview Script de substituição de hardcode por tokens
 * @author Rainer Teixeira
 */

const fs = require('fs');
const path = require('path');

// Mapeamento de padrões hardcoded para tokens
const TOKEN_MAPPINGS = {
  // Animation Duration
  'duration-0': 'ANIMATION_DURATION.INSTANT',
  'duration-150': 'ANIMATION_DURATION.FAST',
  'duration-300': 'ANIMATION_DURATION.NORMAL',
  'duration-500': 'ANIMATION_DURATION.SLOW',
  'duration-1000': 'ANIMATION_DURATION.VERY_SLOW',

  // Animation Delay
  'delay-0': 'ANIMATION_DELAY_CLASSES.NONE',
  'delay-100': 'ANIMATION_DELAY_CLASSES.SHORT',
  'delay-300': 'ANIMATION_DELAY_CLASSES.MEDIUM',
  'delay-500': 'ANIMATION_DELAY_CLASSES.LONG',

  // Easing
  'ease-linear': 'EASING_CLASSES.LINEAR',
  'ease-in': 'EASING_CLASSES.IN',
  'ease-out': 'EASING_CLASSES.OUT',
  'ease-in-out': 'EASING_CLASSES.IN_OUT',

  // Border Radius
  'rounded-none': 'BORDER_RADIUS.NONE',
  'rounded-sm': 'BORDER_RADIUS.SM',
  rounded: 'BORDER_RADIUS.DEFAULT',
  'rounded-md': 'BORDER_RADIUS.MD',
  'rounded-lg': 'BORDER_RADIUS.LG',
  'rounded-xl': 'BORDER_RADIUS.XL',
  'rounded-2xl': 'BORDER_RADIUS["2XL"]',
  'rounded-3xl': 'BORDER_RADIUS["3XL"]',
  'rounded-full': 'BORDER_RADIUS.FULL',

  // Shadows
  'shadow-none': 'SHADOWS.NONE',
  'shadow-sm': 'SHADOWS.SMALL',
  'shadow-md': 'SHADOWS.MEDIUM',
  'shadow-lg': 'SHADOWS.LARGE',
  'shadow-xl': 'SHADOWS.XLARGE',
  'shadow-2xl': 'SHADOWS.XXLARGE',

  // Z-Index
  'z-auto': 'Z_INDEX_CLASSES.AUTO',
  'z-10': 'Z_INDEX_CLASSES.CONTENT',
  'z-20': 'Z_INDEX_CLASSES.OVERLAY',
  'z-30': 'Z_INDEX_CLASSES.DROPDOWN',
  'z-40': 'Z_INDEX_CLASSES.STICKY',
  'z-50': 'Z_INDEX_CLASSES.NAVBAR',

  // Transitions
  'transition-none': 'TRANSITIONS.NONE',
  'transition-all duration-150': 'TRANSITIONS.FAST',
  'transition-all duration-300': 'TRANSITIONS.NORMAL',
  'transition-all duration-500': 'TRANSITIONS.SLOW',
  'transition-all duration-1000': 'TRANSITIONS.VERY_SLOW',
  'transition-colors duration-300': 'TRANSITIONS.COLORS',
  'transition-colors duration-150': 'TRANSITIONS.COLORS_FAST',
  'transition-transform duration-300': 'TRANSITIONS.TRANSFORM',
  'transition-transform duration-150': 'TRANSITIONS.TRANSFORM_FAST',
  'transition-opacity duration-300': 'TRANSITIONS.OPACITY',
  'transition-opacity duration-500': 'TRANSITIONS.OPACITY_SLOW',
  'transition-opacity duration-1000': 'TRANSITIONS.OPACITY_VERY_SLOW',
  'transition-all duration-300 ease-in-out': 'TRANSITIONS.ALL_EASE_IN_OUT',
  'transition-all duration-150 ease-in-out': 'TRANSITIONS.ALL_FAST_EASE_IN_OUT',

  // Backdrop Blur
  'backdrop-blur-none': 'BACKDROP_BLUR.NONE',
  'backdrop-blur-sm': 'BACKDROP_BLUR.SM',
  'backdrop-blur': 'BACKDROP_BLUR.DEFAULT',
  'backdrop-blur-md': 'BACKDROP_BLUR.MD',
  'backdrop-blur-lg': 'BACKDROP_BLUR.LG',
  'backdrop-blur-xl': 'BACKDROP_BLUR.XL',
  'backdrop-blur-2xl': 'BACKDROP_BLUR["2XL"]',
  'backdrop-blur-3xl': 'BACKDROP_BLUR["3XL"]',

  // Opacity
  'opacity-0': 'OPACITY.NONE',
  'opacity-20': 'OPACITY.VERY_LOW',
  'opacity-30': 'OPACITY.LOW',
  'opacity-50': 'OPACITY.MEDIUM',
  'opacity-90': 'OPACITY.HIGH',
  'opacity-100': 'OPACITY.FULL',

  // Font Weight
  'font-thin': 'FONT_WEIGHT.THIN',
  'font-light': 'FONT_WEIGHT.LIGHT',
  'font-normal': 'FONT_WEIGHT.NORMAL',
  'font-medium': 'FONT_WEIGHT.MEDIUM',
  'font-semibold': 'FONT_WEIGHT.SEMIBOLD',
  'font-bold': 'FONT_WEIGHT.BOLD',
  'font-extrabold': 'FONT_WEIGHT.EXTRABOLD',
  'font-black': 'FONT_WEIGHT.BLACK',

  // Letter Spacing
  'tracking-tighter': 'LETTER_SPACING.TIGHTER',
  'tracking-tight': 'LETTER_SPACING.TIGHT',
  'tracking-normal': 'LETTER_SPACING.NORMAL',
  'tracking-wide': 'LETTER_SPACING.WIDE',
  'tracking-wider': 'LETTER_SPACING.WIDER',
  'tracking-widest': 'LETTER_SPACING.WIDEST',

  // Line Height
  'leading-none': 'LINE_HEIGHT.NONE',
  'leading-tight': 'LINE_HEIGHT.TIGHT',
  'leading-snug': 'LINE_HEIGHT.SNUG',
  'leading-normal': 'LINE_HEIGHT.NORMAL',
  'leading-relaxed': 'LINE_HEIGHT.RELAXED',
  'leading-loose': 'LINE_HEIGHT.LOOSE',

  // Scale
  'scale-95': 'SCALE.SMALL',
  'scale-100': 'SCALE.NORMAL',
  'scale-105': 'SCALE.MEDIUM',
  'scale-110': 'SCALE.LARGE',
  'scale-125': 'SCALE.XLARGE',

  // Gradient Directions
  'bg-gradient-to-r': 'GRADIENT_DIRECTIONS.TO_RIGHT',
  'bg-gradient-to-l': 'GRADIENT_DIRECTIONS.TO_LEFT',
  'bg-gradient-to-b': 'GRADIENT_DIRECTIONS.TO_BOTTOM',
  'bg-gradient-to-t': 'GRADIENT_DIRECTIONS.TO_TOP',
  'bg-gradient-to-br': 'GRADIENT_DIRECTIONS.TO_BR',
  'bg-gradient-to-bl': 'GRADIENT_DIRECTIONS.TO_BL',
  'bg-gradient-to-tr': 'GRADIENT_DIRECTIONS.TO_TR',
  'bg-gradient-to-tl': 'GRADIENT_DIRECTIONS.TO_TL',
};

// Padrões regex para encontrar valores hardcoded
const HARDCODE_PATTERNS = {
  duration: /duration-\d+/g,
  delay: /delay-\d+/g,
  easing: /ease-(linear|in|out|in-out)/g,
  rounded: /rounded-(none|sm|md|lg|xl|2xl|3xl|full)/g,
  shadow: /shadow-(none|sm|md|lg|xl|2xl)/g,
  zIndex: /z-(auto|\d+)/g,
  transition:
    /transition-(none|all|colors|transform|opacity)(\s+duration-\d+)?(\s+ease-[-\w]+)?/g,
  backdropBlur: /backdrop-blur-(none|sm|md|lg|xl|2xl|3xl)/g,
  opacity: /opacity-(0|20|30|50|90|100)/g,
  fontWeight: /font-(thin|light|normal|medium|semibold|bold|extrabold|black)/g,
  tracking: /tracking-(tighter|tight|normal|wide|wider|widest)/g,
  leading: /leading-(none|tight|snug|normal|relaxed|loose)/g,
  scale: /scale-(95|100|105|110|125)/g,
  gradient: /bg-gradient-to-[rltb]|bg-gradient-to-[blrt]{2}/g,
};

/**
 * Encontra todos os arquivos TypeScript/TSX no projeto
 */
function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Ignorar node_modules, .next, .git, etc.
      if (
        ![
          'node_modules',
          '.next',
          '.git',
          'dist',
          'build',
          'coverage',
          'tests',
        ].includes(file)
      ) {
        findTsxFiles(filePath, fileList);
      }
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      // Ignorar arquivos de teste e tipos
      if (
        !file.includes('.test.') &&
        !file.includes('.spec.') &&
        !file.includes('.d.ts')
      ) {
        fileList.push(filePath);
      }
    }
  });

  return fileList;
}

/**
 * Analisa um arquivo e encontra valores hardcoded
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];

  // Verificar se já importa design tokens
  const hasDesignTokensImport =
    content.includes("from '@/constants/design-tokens'") ||
    content.includes('from "./design-tokens"') ||
    content.includes("from '../constants/design-tokens'");

  // Procurar por padrões hardcoded
  Object.entries(HARDCODE_PATTERNS).forEach(([patternName, regex]) => {
    const matches = content.match(regex);
    if (matches) {
      matches.forEach(match => {
        const token = TOKEN_MAPPINGS[match];
        if (token) {
          issues.push({
            file: filePath,
            pattern: patternName,
            hardcoded: match,
            token: token,
            line: content.substring(0, content.indexOf(match)).split('\n')
              .length,
          });
        }
      });
    }
  });

  return {
    file: filePath,
    hasDesignTokensImport,
    issues,
  };
}

/**
 * Gera relatório de análise
 */
function generateReport(results) {
  const report = {
    totalFiles: results.length,
    filesWithIssues: results.filter(r => r.issues.length > 0).length,
    totalIssues: results.reduce((sum, r) => sum + r.issues.length, 0),
    filesNeedingImport: results.filter(
      r => r.issues.length > 0 && !r.hasDesignTokensImport
    ).length,
    issuesByPattern: {},
    files: results,
  };

  // Agrupar issues por padrão
  results.forEach(result => {
    result.issues.forEach(issue => {
      if (!report.issuesByPattern[issue.pattern]) {
        report.issuesByPattern[issue.pattern] = 0;
      }
      report.issuesByPattern[issue.pattern]++;
    });
  });

  return report;
}

/**
 * Aplica substituições em um arquivo
 */
function applyReplacements(filePath, issues, dryRun = true) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  let needsImport = false;

  // Verificar se precisa adicionar import
  const hasDesignTokensImport = content.includes(
    "from '@/constants/design-tokens'"
  );
  if (!hasDesignTokensImport && issues.length > 0) {
    needsImport = true;
  }

  // Aplicar substituições
  issues.forEach(issue => {
    const oldValue = issue.hardcoded;
    const newValue = `{${issue.token}}`;

    // Substituir apenas em className (não em strings literais ou comentários)
    const classNameRegex = new RegExp(
      `(className=["'\`][^"'\`]*?)${oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"'\`]*?["'\`])`,
      'g'
    );

    if (classNameRegex.test(content)) {
      content = content.replace(classNameRegex, (match, before, after) => {
        return before + newValue + after;
      });
      modified = true;
    }
  });

  // Adicionar import se necessário
  if (needsImport && !dryRun) {
    // Encontrar última linha de import
    const importLines = content.match(/^import .+ from .+;?$/gm);
    if (importLines && importLines.length > 0) {
      const lastImport = importLines[importLines.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const afterLastImport = content.substring(
        lastImportIndex + lastImport.length
      );

      // Extrair tokens únicos necessários
      const neededTokens = [...new Set(issues.map(i => i.token.split('.')[0]))];
      const importStatement = `import { ${neededTokens.join(', ')} } from '@/constants/design-tokens';`;

      content =
        content.substring(0, lastImportIndex + lastImport.length) +
        '\n' +
        importStatement +
        afterLastImport;
      modified = true;
    }
  }

  if (modified && !dryRun) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return { modified, needsImport };
}

// Main execution
const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');

console.log('🔍 Procurando arquivos TypeScript/TSX...\n');

const files = [...findTsxFiles(componentsDir), ...findTsxFiles(appDir)];

console.log(`📁 Encontrados ${files.length} arquivos\n`);
console.log('🔎 Analisando arquivos...\n');

const results = files.map(analyzeFile);
const report = generateReport(results);

// Exibir relatório
console.log('═══════════════════════════════════════════════════════════');
console.log('📊 RELATÓRIO DE ANÁLISE');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`Total de arquivos analisados: ${report.totalFiles}`);
console.log(`Arquivos com valores hardcoded: ${report.filesWithIssues}`);
console.log(`Total de valores hardcoded encontrados: ${report.totalIssues}`);
console.log(`Arquivos que precisam de import: ${report.filesNeedingImport}\n`);

if (Object.keys(report.issuesByPattern).length > 0) {
  console.log('📋 Issues por padrão:');
  Object.entries(report.issuesByPattern)
    .sort((a, b) => b[1] - a[1])
    .forEach(([pattern, count]) => {
      console.log(`   ${pattern}: ${count} ocorrências`);
    });
  console.log('');
}

// Listar arquivos com mais issues
const filesWithMostIssues = results
  .filter(r => r.issues.length > 0)
  .sort((a, b) => b.issues.length - a.issues.length)
  .slice(0, 10);

if (filesWithMostIssues.length > 0) {
  console.log('🔴 Top 10 arquivos com mais valores hardcoded:');
  filesWithMostIssues.forEach((result, index) => {
    const relativePath = path.relative(projectRoot, result.file);
    console.log(
      `   ${index + 1}. ${relativePath} (${result.issues.length} issues)`
    );
    if (!result.hasDesignTokensImport) {
      console.log(`      ⚠️  Precisa adicionar import de design-tokens`);
    }
  });
  console.log('');
}

// Salvar relatório detalhado
const reportPath = path.join(projectRoot, 'scripts', 'hardcode-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');
console.log(`💾 Relatório detalhado salvo em: ${reportPath}\n`);

// Perguntar se deve aplicar substituições
const args = process.argv.slice(2);
const shouldApply = args.includes('--apply') || args.includes('-a');

if (shouldApply) {
  console.log('🔧 Aplicando substituições...\n');

  let totalModified = 0;
  let totalImportsAdded = 0;

  results.forEach(result => {
    if (result.issues.length > 0) {
      const { modified, needsImport } = applyReplacements(
        result.file,
        result.issues,
        false
      );
      if (modified) {
        totalModified++;
        const relativePath = path.relative(projectRoot, result.file);
        console.log(`   ✅ ${relativePath}`);
        if (needsImport) {
          totalImportsAdded++;
          console.log(`      ➕ Import adicionado`);
        }
      }
    }
  });

  console.log(`\n✅ Concluído!`);
  console.log(`   ${totalModified} arquivos modificados`);
  console.log(`   ${totalImportsAdded} imports adicionados\n`);
} else {
  console.log('💡 Para aplicar as substituições automaticamente, execute:');
  console.log('   node scripts/replace-hardcoded-with-tokens.js --apply\n');
}
