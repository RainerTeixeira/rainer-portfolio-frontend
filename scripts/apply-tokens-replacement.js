/**
 * Script melhorado para substituir valores hardcoded por design tokens
 *
 * Este script faz substituições mais inteligentes:
 * - Usa cn() quando disponível
 * - Mantém sintaxe válida
 * - Adiciona imports automaticamente
 *
 * @fileoverview Script de substituição inteligente de hardcode por tokens
 * @author Rainer Teixeira
 */

const fs = require('fs');
const path = require('path');

// Mapeamento reverso: classe → token
const CLASS_TO_TOKEN = {
  // Animation Duration
  'duration-0': { token: 'ANIMATION_DURATION', key: 'INSTANT' },
  'duration-150': { token: 'ANIMATION_DURATION', key: 'FAST' },
  'duration-300': { token: 'ANIMATION_DURATION', key: 'NORMAL' },
  'duration-500': { token: 'ANIMATION_DURATION', key: 'SLOW' },
  'duration-1000': { token: 'ANIMATION_DURATION', key: 'VERY_SLOW' },

  // Animation Delay
  'delay-0': { token: 'ANIMATION_DELAY_CLASSES', key: 'NONE' },
  'delay-100': { token: 'ANIMATION_DELAY_CLASSES', key: 'SHORT' },
  'delay-300': { token: 'ANIMATION_DELAY_CLASSES', key: 'MEDIUM' },
  'delay-500': { token: 'ANIMATION_DELAY_CLASSES', key: 'LONG' },

  // Easing
  'ease-linear': { token: 'EASING_CLASSES', key: 'LINEAR' },
  'ease-in': { token: 'EASING_CLASSES', key: 'IN' },
  'ease-out': { token: 'EASING_CLASSES', key: 'OUT' },
  'ease-in-out': { token: 'EASING_CLASSES', key: 'IN_OUT' },

  // Border Radius
  'rounded-none': { token: 'BORDER_RADIUS', key: 'NONE' },
  'rounded-sm': { token: 'BORDER_RADIUS', key: 'SM' },
  rounded: { token: 'BORDER_RADIUS', key: 'DEFAULT' },
  'rounded-md': { token: 'BORDER_RADIUS', key: 'MD' },
  'rounded-lg': { token: 'BORDER_RADIUS', key: 'LG' },
  'rounded-xl': { token: 'BORDER_RADIUS', key: 'XL' },
  'rounded-2xl': { token: 'BORDER_RADIUS', key: '2XL' },
  'rounded-3xl': { token: 'BORDER_RADIUS', key: '3XL' },
  'rounded-full': { token: 'BORDER_RADIUS', key: 'FULL' },

  // Shadows
  'shadow-none': { token: 'SHADOWS', key: 'NONE' },
  'shadow-sm': { token: 'SHADOWS', key: 'SMALL' },
  'shadow-md': { token: 'SHADOWS', key: 'MEDIUM' },
  'shadow-lg': { token: 'SHADOWS', key: 'LARGE' },
  'shadow-xl': { token: 'SHADOWS', key: 'XLARGE' },
  'shadow-2xl': { token: 'SHADOWS', key: 'XXLARGE' },

  // Z-Index
  'z-auto': { token: 'Z_INDEX_CLASSES', key: 'AUTO' },
  'z-10': { token: 'Z_INDEX_CLASSES', key: 'CONTENT' },
  'z-20': { token: 'Z_INDEX_CLASSES', key: 'OVERLAY' },
  'z-30': { token: 'Z_INDEX_CLASSES', key: 'DROPDOWN' },
  'z-40': { token: 'Z_INDEX_CLASSES', key: 'STICKY' },
  'z-50': { token: 'Z_INDEX_CLASSES', key: 'NAVBAR' },

  // Transitions (combinadas)
  'transition-none': { token: 'TRANSITIONS', key: 'NONE' },
  'transition-all duration-150': { token: 'TRANSITIONS', key: 'FAST' },
  'transition-all duration-300': { token: 'TRANSITIONS', key: 'NORMAL' },
  'transition-all duration-500': { token: 'TRANSITIONS', key: 'SLOW' },
  'transition-all duration-1000': { token: 'TRANSITIONS', key: 'VERY_SLOW' },
  'transition-colors duration-300': { token: 'TRANSITIONS', key: 'COLORS' },
  'transition-colors duration-150': {
    token: 'TRANSITIONS',
    key: 'COLORS_FAST',
  },
  'transition-transform duration-300': {
    token: 'TRANSITIONS',
    key: 'TRANSFORM',
  },
  'transition-transform duration-150': {
    token: 'TRANSITIONS',
    key: 'TRANSFORM_FAST',
  },
  'transition-opacity duration-300': { token: 'TRANSITIONS', key: 'OPACITY' },
  'transition-opacity duration-500': {
    token: 'TRANSITIONS',
    key: 'OPACITY_SLOW',
  },
  'transition-opacity duration-1000': {
    token: 'TRANSITIONS',
    key: 'OPACITY_VERY_SLOW',
  },
  'transition-all duration-300 ease-in-out': {
    token: 'TRANSITIONS',
    key: 'ALL_EASE_IN_OUT',
  },
  'transition-all duration-150 ease-in-out': {
    token: 'TRANSITIONS',
    key: 'ALL_FAST_EASE_IN_OUT',
  },

  // Backdrop Blur
  'backdrop-blur-none': { token: 'BACKDROP_BLUR', key: 'NONE' },
  'backdrop-blur-sm': { token: 'BACKDROP_BLUR', key: 'SM' },
  'backdrop-blur': { token: 'BACKDROP_BLUR', key: 'DEFAULT' },
  'backdrop-blur-md': { token: 'BACKDROP_BLUR', key: 'MD' },
  'backdrop-blur-lg': { token: 'BACKDROP_BLUR', key: 'LG' },
  'backdrop-blur-xl': { token: 'BACKDROP_BLUR', key: 'XL' },
  'backdrop-blur-2xl': { token: 'BACKDROP_BLUR', key: '2XL' },
  'backdrop-blur-3xl': { token: 'BACKDROP_BLUR', key: '3XL' },

  // Opacity
  'opacity-0': { token: 'OPACITY', key: 'NONE' },
  'opacity-20': { token: 'OPACITY', key: 'VERY_LOW' },
  'opacity-30': { token: 'OPACITY', key: 'LOW' },
  'opacity-50': { token: 'OPACITY', key: 'MEDIUM' },
  'opacity-90': { token: 'OPACITY', key: 'HIGH' },
  'opacity-100': { token: 'OPACITY', key: 'FULL' },

  // Font Weight
  'font-thin': { token: 'FONT_WEIGHT', key: 'THIN' },
  'font-light': { token: 'FONT_WEIGHT', key: 'LIGHT' },
  'font-normal': { token: 'FONT_WEIGHT', key: 'NORMAL' },
  'font-medium': { token: 'FONT_WEIGHT', key: 'MEDIUM' },
  'font-semibold': { token: 'FONT_WEIGHT', key: 'SEMIBOLD' },
  'font-bold': { token: 'FONT_WEIGHT', key: 'BOLD' },
  'font-extrabold': { token: 'FONT_WEIGHT', key: 'EXTRABOLD' },
  'font-black': { token: 'FONT_WEIGHT', key: 'BLACK' },

  // Letter Spacing
  'tracking-tighter': { token: 'LETTER_SPACING', key: 'TIGHTER' },
  'tracking-tight': { token: 'LETTER_SPACING', key: 'TIGHT' },
  'tracking-normal': { token: 'LETTER_SPACING', key: 'NORMAL' },
  'tracking-wide': { token: 'LETTER_SPACING', key: 'WIDE' },
  'tracking-wider': { token: 'LETTER_SPACING', key: 'WIDER' },
  'tracking-widest': { token: 'LETTER_SPACING', key: 'WIDEST' },

  // Line Height
  'leading-none': { token: 'LINE_HEIGHT', key: 'NONE' },
  'leading-tight': { token: 'LINE_HEIGHT', key: 'TIGHT' },
  'leading-snug': { token: 'LINE_HEIGHT', key: 'SNUG' },
  'leading-normal': { token: 'LINE_HEIGHT', key: 'NORMAL' },
  'leading-relaxed': { token: 'LINE_HEIGHT', key: 'RELAXED' },
  'leading-loose': { token: 'LINE_HEIGHT', key: 'LOOSE' },

  // Scale
  'scale-95': { token: 'SCALE', key: 'SMALL' },
  'scale-100': { token: 'SCALE', key: 'NORMAL' },
  'scale-105': { token: 'SCALE', key: 'MEDIUM' },
  'scale-110': { token: 'SCALE', key: 'LARGE' },
  'scale-125': { token: 'SCALE', key: 'XLARGE' },

  // Gradient Directions
  'bg-gradient-to-r': { token: 'GRADIENT_DIRECTIONS', key: 'TO_RIGHT' },
  'bg-gradient-to-l': { token: 'GRADIENT_DIRECTIONS', key: 'TO_LEFT' },
  'bg-gradient-to-b': { token: 'GRADIENT_DIRECTIONS', key: 'TO_BOTTOM' },
  'bg-gradient-to-t': { token: 'GRADIENT_DIRECTIONS', key: 'TO_TOP' },
  'bg-gradient-to-br': { token: 'GRADIENT_DIRECTIONS', key: 'TO_BR' },
  'bg-gradient-to-bl': { token: 'GRADIENT_DIRECTIONS', key: 'TO_BL' },
  'bg-gradient-to-tr': { token: 'GRADIENT_DIRECTIONS', key: 'TO_TR' },
  'bg-gradient-to-tl': { token: 'GRADIENT_DIRECTIONS', key: 'TO_TL' },
};

/**
 * Substitui classes hardcoded em uma string de className
 */
function replaceInClassName(classNameString, usedTokens = new Set()) {
  let modified = classNameString;
  let changed = false;

  // Ordenar por tamanho (maior primeiro) para evitar substituições parciais
  const sortedClasses = Object.keys(CLASS_TO_TOKEN).sort(
    (a, b) => b.length - a.length
  );

  sortedClasses.forEach(className => {
    const tokenInfo = CLASS_TO_TOKEN[className];
    const tokenRef = `${tokenInfo.token}.${tokenInfo.key}`;

    // Substituir classe completa (com espaços ao redor ou no início/fim)
    const regex = new RegExp(
      `(^|\\s)${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(\\s|$)`,
      'g'
    );

    if (regex.test(modified)) {
      modified = modified.replace(regex, (match, before, after) => {
        usedTokens.add(tokenInfo.token);
        return before + `{${tokenRef}}` + after;
      });
      changed = true;
    }
  });

  return { modified, changed, usedTokens };
}

/**
 * Processa um arquivo e aplica substituições
 */
function processFile(filePath, dryRun = false) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const originalContent = content;
  const usedTokens = new Set();
  let totalReplacements = 0;

  // Verificar se já tem import
  const hasImport = /from ['"]@\/constants\/rainer-design-tokens['"]/.test(
    content
  );

  // Encontrar todas as className strings
  const classNameRegex = /className\s*=\s*{?["'`]([^"'`]+)["'`]}?/g;
  const matches = [...content.matchAll(classNameRegex)];

  matches.forEach(match => {
    const fullMatch = match[0];
    const classNameValue = match[1];

    const {
      modified: newClassName,
      changed,
      usedTokens: tokens,
    } = replaceInClassName(classNameValue, usedTokens);

    if (changed) {
      const newFullMatch = fullMatch.replace(classNameValue, newClassName);
      content = content.replace(fullMatch, newFullMatch);
      totalReplacements += Object.keys(CLASS_TO_TOKEN).filter(c =>
        newClassName.includes(c)
      ).length;
    }
  });

  // Também procurar em template strings com cn()
  const cnRegex = /cn\(([^)]+)\)/g;
  const cnMatches = [...content.matchAll(cnRegex)];

  cnMatches.forEach(match => {
    const cnArgs = match[1];
    const { modified: newArgs, changed } = replaceInClassName(
      cnArgs,
      usedTokens
    );

    if (changed) {
      content = content.replace(match[0], `cn(${newArgs})`);
      totalReplacements++;
    }
  });

  // Adicionar import se necessário
  if (usedTokens.size > 0 && !hasImport && !dryRun) {
    const tokensArray = Array.from(usedTokens).sort();
    const importStatement = `import { ${tokensArray.join(', ')} } from '@/constants/rainer-design-tokens';`;

    // Encontrar última linha de import
    const importLines = content.match(/^import .+ from .+;?$/gm);
    if (importLines && importLines.length > 0) {
      const lastImport = importLines[importLines.length - 1];
      const lastImportIndex = content.lastIndexOf(lastImport);
      const afterLastImport = content.substring(
        lastImportIndex + lastImport.length
      );

      content =
        content.substring(0, lastImportIndex + lastImport.length) +
        '\n' +
        importStatement +
        afterLastImport;
    } else {
      // Se não houver imports, adicionar no início (após comentários de cabeçalho)
      const headerEnd = content.match(/\*\//);
      if (headerEnd) {
        const headerEndIndex = content.indexOf('*/', headerEnd.index) + 2;
        content =
          content.substring(0, headerEndIndex) +
          '\n\n' +
          importStatement +
          content.substring(headerEndIndex);
      } else {
        content = importStatement + '\n\n' + content;
      }
    }
  }

  if (!dryRun && content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
  }

  return {
    modified: content !== originalContent,
    replacements: totalReplacements,
    tokensUsed: Array.from(usedTokens),
    needsImport: usedTokens.size > 0 && !hasImport,
  };
}

// Main
const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');

function findTsxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
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
    } else if (
      (file.endsWith('.tsx') || file.endsWith('.ts')) &&
      !file.includes('.test.') &&
      !file.includes('.spec.') &&
      !file.includes('.d.ts')
    ) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const files = [...findTsxFiles(componentsDir), ...findTsxFiles(appDir)];

console.log(`🔍 Processando ${files.length} arquivos...\n`);

const args = process.argv.slice(2);
const dryRun = !args.includes('--apply') && !args.includes('-a');

let totalModified = 0;
let totalReplacements = 0;
let totalImportsAdded = 0;

files.forEach(filePath => {
  const result = processFile(filePath, dryRun);

  if (result.modified) {
    totalModified++;
    totalReplacements += result.replacements;
    if (result.needsImport) totalImportsAdded++;

    const relativePath = path.relative(projectRoot, filePath);
    console.log(`✅ ${relativePath}`);
    if (result.tokensUsed.length > 0) {
      console.log(`   Tokens: ${result.tokensUsed.join(', ')}`);
    }
  }
});

console.log(`\n📊 Resumo:`);
console.log(`   Arquivos modificados: ${totalModified}`);
console.log(`   Substituições aplicadas: ${totalReplacements}`);
console.log(`   Imports adicionados: ${totalImportsAdded}`);

if (dryRun) {
  console.log(`\n💡 Para aplicar as mudanças, execute:`);
  console.log(`   node scripts/apply-tokens-replacement.js --apply`);
}
