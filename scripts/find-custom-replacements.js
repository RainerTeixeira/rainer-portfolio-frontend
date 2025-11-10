/**
 * Script para identificar código customizado que pode ser substituído por shadcn/ui
 *
 * @fileoverview Identificação de oportunidades de substituição
 * @author Rainer Teixeira
 */

const fs = require('fs');
const path = require('path');

/**
 * Padrões de código customizado que podem ser substituídos
 */
const REPLACEMENT_OPPORTUNITIES = {
  carousel: {
    patterns: [
      /useState.*carousel|carousel.*useState/i,
      /carousel.*custom|custom.*carousel/i,
      /slide.*index|currentSlide/i,
      /nextSlide|prevSlide|goToSlide/i,
    ],
    replacement: 'Carousel (shadcn/ui)',
    files: [],
  },
  accordion: {
    patterns: [
      /isOpen.*useState|useState.*isOpen/i,
      /toggle.*accordion|accordion.*toggle/i,
      /collapsible.*custom|custom.*collapsible/i,
    ],
    replacement: 'Accordion (shadcn/ui)',
    files: [],
  },
  table: {
    patterns: [/<table[^>]*>/i, /table.*custom|custom.*table/i],
    replacement: 'Table (shadcn/ui)',
    files: [],
  },
  navigation: {
    patterns: [
      /menu.*custom|custom.*menu/i,
      /dropdown.*custom|custom.*dropdown/i,
      /nav.*useState|useState.*nav/i,
    ],
    replacement: 'Navigation Menu (shadcn/ui)',
    files: [],
  },
  toast: {
    patterns: [
      /toast.*custom|custom.*toast/i,
      /notification.*custom|custom.*notification/i,
      /useToast[^s]/i, // useToast mas não useToastState
    ],
    replacement: 'Sonner (shadcn/ui)',
    files: [],
  },
};

/**
 * Encontra arquivos TypeScript/TSX
 */
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
          'ui',
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

/**
 * Analisa um arquivo para oportunidades de substituição
 */
function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const opportunities = [];

  Object.entries(REPLACEMENT_OPPORTUNITIES).forEach(([type, config]) => {
    config.patterns.forEach(pattern => {
      if (pattern.test(content)) {
        opportunities.push({
          type,
          replacement: config.replacement,
          file: filePath,
        });
      }
    });
  });

  return opportunities;
}

// Main
const projectRoot = path.join(__dirname, '..');
const componentsDir = path.join(projectRoot, 'components');
const appDir = path.join(projectRoot, 'app');

console.log('🔍 Procurando oportunidades de substituição...\n');

const files = [...findTsxFiles(componentsDir), ...findTsxFiles(appDir)];

const allOpportunities = [];

files.forEach(file => {
  const opportunities = analyzeFile(file);
  if (opportunities.length > 0) {
    allOpportunities.push(...opportunities);
  }
});

// Agrupar por tipo
const grouped = {};
allOpportunities.forEach(opp => {
  if (!grouped[opp.type]) {
    grouped[opp.type] = [];
  }
  grouped[opp.type].push(opp);
});

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 OPORTUNIDADES DE SUBSTITUIÇÃO');
console.log('═══════════════════════════════════════════════════════════\n');

if (Object.keys(grouped).length === 0) {
  console.log('✅ Nenhuma oportunidade encontrada!\n');
} else {
  Object.entries(grouped).forEach(([type, opps]) => {
    const uniqueFiles = [...new Set(opps.map(o => o.file))];
    console.log(`📦 ${type.toUpperCase()}`);
    console.log(`   Substituir por: ${opps[0].replacement}`);
    console.log(`   Arquivos encontrados: ${uniqueFiles.length}\n`);

    uniqueFiles.slice(0, 5).forEach(file => {
      const relativePath = path.relative(projectRoot, file);
      console.log(`   • ${relativePath}`);
    });

    if (uniqueFiles.length > 5) {
      console.log(`   ... e mais ${uniqueFiles.length - 5} arquivo(s)\n`);
    } else {
      console.log('');
    }
  });
}

// Salvar relatório
const reportPath = path.join(
  projectRoot,
  'scripts',
  'replacement-opportunities.json'
);
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    { opportunities: grouped, total: allOpportunities.length },
    null,
    2
  ),
  'utf-8'
);

console.log(`💾 Relatório salvo em: ${reportPath}\n`);
