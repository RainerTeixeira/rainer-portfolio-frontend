/**
 * Script para analisar uso de shadcn/ui e identificar oportunidades
 *
 * Este script:
 * 1. Lista componentes shadcn/ui disponíveis
 * 2. Verifica quais estão instalados
 * 3. Identifica oportunidades de uso
 * 4. Sugere componentes que poderiam ser adicionados
 *
 * @fileoverview Análise de uso de shadcn/ui
 * @author Rainer Teixeira
 */

const fs = require('fs');
const path = require('path');

// Lista completa de componentes shadcn/ui disponíveis
const SHADCN_COMPONENTS = [
  'accordion',
  'alert',
  'alert-dialog',
  'aspect-ratio',
  'avatar',
  'badge',
  'button',
  'calendar',
  'card',
  'carousel',
  'checkbox',
  'collapsible',
  'command',
  'context-menu',
  'dialog',
  'drawer',
  'dropdown-menu',
  'form',
  'hover-card',
  'input',
  'label',
  'menubar',
  'navigation-menu',
  'popover',
  'progress',
  'radio-group',
  'scroll-area',
  'select',
  'separator',
  'sheet',
  'skeleton',
  'slider',
  'sonner', // toast
  'switch',
  'table',
  'tabs',
  'textarea',
  'toast',
  'toggle',
  'toggle-group',
  'tooltip',
];

/**
 * Verifica quais componentes shadcn/ui estão instalados
 */
function getInstalledComponents() {
  const uiDir = path.join(__dirname, '..', 'components', 'ui');
  const files = fs.readdirSync(uiDir);

  return files
    .filter(file => file.endsWith('.tsx') && !file.includes('index'))
    .map(file => file.replace('.tsx', ''))
    .filter(comp => SHADCN_COMPONENTS.includes(comp));
}

/**
 * Verifica uso de componentes em arquivos
 */
function findComponentUsage(componentName) {
  const projectRoot = path.join(__dirname, '..');
  const componentsDir = path.join(projectRoot, 'components');
  const appDir = path.join(projectRoot, 'app');

  const usage = [];

  function searchInDir(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        if (
          !['node_modules', '.next', '.git', 'dist', 'build'].includes(file)
        ) {
          searchInDir(filePath);
        }
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const importRegex = new RegExp(
          `from ['"]@/components/ui/${componentName}['"]`,
          'g'
        );
        const componentRegex = new RegExp(
          `<${componentName
            .split('-')
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')}[^>]*>`,
          'g'
        );

        if (importRegex.test(content) || componentRegex.test(content)) {
          usage.push(path.relative(projectRoot, filePath));
        }
      }
    });
  }

  searchInDir(componentsDir);
  searchInDir(appDir);

  return usage;
}

/**
 * Identifica oportunidades de uso
 */
function findOpportunities() {
  const opportunities = [];

  // Componentes que poderiam substituir código customizado
  const suggestions = {
    accordion: {
      description: 'Para seções expansíveis/colapsáveis',
      useCases: ['FAQ', 'Filtros expansíveis', 'Listas de itens colapsáveis'],
    },
    carousel: {
      description: 'Para carrosséis de imagens/conteúdo',
      useCases: ['Galeria de imagens', 'Testimonials', 'Posts em destaque'],
    },
    drawer: {
      description: 'Menu lateral mobile',
      useCases: ['Menu mobile', 'Filtros mobile', 'Navegação lateral'],
    },
    'hover-card': {
      description: 'Cards que aparecem no hover',
      useCases: [
        'Preview de conteúdo',
        'Tooltips avançados',
        'Informações adicionais',
      ],
    },
    menubar: {
      description: 'Barra de menu horizontal',
      useCases: [
        'Menu principal',
        'Navegação horizontal',
        'Barra de ferramentas',
      ],
    },
    'navigation-menu': {
      description: 'Menu de navegação avançado',
      useCases: ['Menu principal', 'Navegação com dropdowns', 'Mega menu'],
    },
    'radio-group': {
      description: 'Grupos de opções radio',
      useCases: ['Seleção de opções', 'Filtros', 'Configurações'],
    },
    slider: {
      description: 'Controle deslizante',
      useCases: ['Filtros de preço', 'Volume', 'Configurações numéricas'],
    },
    sonner: {
      description: 'Notificações toast modernas',
      useCases: ['Mensagens de sucesso/erro', 'Notificações', 'Feedback'],
    },
    table: {
      description: 'Tabelas responsivas',
      useCases: ['Dados tabulares', 'Listas de dados', 'Dashboards'],
    },
    toggle: {
      description: 'Botões toggle',
      useCases: ['Alternar estados', 'Filtros', 'Configurações'],
    },
    'toggle-group': {
      description: 'Grupo de toggles',
      useCases: [
        'Múltiplas seleções',
        'Filtros múltiplos',
        'Opções relacionadas',
      ],
    },
  };

  return suggestions;
}

// Main
const projectRoot = path.join(__dirname, '..');
const installed = getInstalledComponents();
const opportunities = findOpportunities();

console.log('═══════════════════════════════════════════════════════════');
console.log('📊 ANÁLISE DE USO SHADCN/UI');
console.log('═══════════════════════════════════════════════════════════\n');

console.log(
  `✅ Componentes instalados: ${installed.length}/${SHADCN_COMPONENTS.length}\n`
);
console.log('📦 Componentes instalados:');
installed.forEach(comp => {
  const usage = findComponentUsage(comp);
  console.log(`   • ${comp} (usado em ${usage.length} arquivo(s))`);
  if (usage.length > 0 && usage.length <= 3) {
    usage.forEach(file => {
      console.log(`     └─ ${file}`);
    });
  }
});
console.log('');

const notInstalled = SHADCN_COMPONENTS.filter(c => !installed.includes(c));
console.log(`❌ Componentes não instalados: ${notInstalled.length}\n`);

if (notInstalled.length > 0) {
  console.log('💡 Oportunidades de uso:\n');
  Object.entries(opportunities).forEach(([comp, info]) => {
    if (notInstalled.includes(comp)) {
      console.log(`   📦 ${comp}`);
      console.log(`      ${info.description}`);
      console.log(`      Casos de uso: ${info.useCases.join(', ')}`);
      console.log(`      Instalar: npx shadcn@latest add ${comp}\n`);
    }
  });
}

// Salvar relatório
const report = {
  installed: installed.map(comp => ({
    name: comp,
    usage: findComponentUsage(comp),
  })),
  notInstalled: notInstalled,
  opportunities: opportunities,
  totalComponents: SHADCN_COMPONENTS.length,
  installedCount: installed.length,
  coverage: ((installed.length / SHADCN_COMPONENTS.length) * 100).toFixed(1),
};

const reportPath = path.join(
  projectRoot,
  'scripts',
  'shadcn-usage-report.json'
);
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf-8');

console.log(`💾 Relatório salvo em: ${reportPath}\n`);
console.log(
  `📈 Cobertura: ${report.coverage}% (${installed.length}/${SHADCN_COMPONENTS.length} componentes)\n`
);
