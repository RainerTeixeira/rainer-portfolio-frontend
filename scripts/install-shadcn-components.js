/**
 * Script para instalar componentes shadcn/ui recomendados
 *
 * @fileoverview Instalação de componentes shadcn/ui
 * @author Rainer Teixeira
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Componentes recomendados para instalar
const RECOMMENDED_COMPONENTS = [
  {
    name: 'accordion',
    priority: 'high',
    reason: 'Útil para FAQs, filtros expansíveis, listas colapsáveis',
  },
  {
    name: 'carousel',
    priority: 'high',
    reason: 'Substituir carrosséis customizados, galerias, testimonials',
  },
  {
    name: 'drawer',
    priority: 'medium',
    reason: 'Menu mobile melhor que Sheet em alguns casos',
  },
  {
    name: 'hover-card',
    priority: 'medium',
    reason: 'Preview de conteúdo, tooltips avançados',
  },
  {
    name: 'navigation-menu',
    priority: 'high',
    reason: 'Menu principal mais robusto que dropdown-menu',
  },
  {
    name: 'radio-group',
    priority: 'medium',
    reason: 'Seleção de opções, filtros, configurações',
  },
  {
    name: 'slider',
    priority: 'low',
    reason: 'Filtros de preço, volume, configurações numéricas',
  },
  {
    name: 'sonner',
    priority: 'high',
    reason: 'Notificações toast modernas (melhor que toast básico)',
  },
  {
    name: 'table',
    priority: 'high',
    reason: 'Tabelas responsivas para dashboards e dados',
  },
  {
    name: 'toggle',
    priority: 'medium',
    reason: 'Botões toggle para alternar estados',
  },
  {
    name: 'toggle-group',
    priority: 'low',
    reason: 'Grupo de toggles para múltiplas seleções',
  },
];

/**
 * Verifica se componente já está instalado
 */
function isInstalled(componentName) {
  const uiDir = path.join(__dirname, '..', 'components', 'ui');
  const filePath = path.join(uiDir, `${componentName}.tsx`);
  return fs.existsSync(filePath);
}

/**
 * Instala um componente shadcn/ui
 */
function installComponent(componentName) {
  try {
    console.log(`\n📦 Instalando ${componentName}...`);
    execSync(`npx shadcn@latest add ${componentName} --yes`, {
      stdio: 'inherit',
      cwd: path.join(__dirname, '..'),
    });
    console.log(`✅ ${componentName} instalado com sucesso!`);
    return true;
  } catch (error) {
    console.error(`❌ Erro ao instalar ${componentName}:`, error.message);
    return false;
  }
}

// Main
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run') || args.includes('-d');
const priority =
  args.find(arg => arg.startsWith('--priority='))?.split('=')[1] || 'all';

console.log('═══════════════════════════════════════════════════════════');
console.log('🚀 INSTALAÇÃO DE COMPONENTES SHADCN/UI');
console.log('═══════════════════════════════════════════════════════════\n');

// Filtrar por prioridade
let toInstall = RECOMMENDED_COMPONENTS;
if (priority !== 'all') {
  toInstall = RECOMMENDED_COMPONENTS.filter(c => c.priority === priority);
}

// Filtrar apenas não instalados
toInstall = toInstall.filter(c => !isInstalled(c.name));

if (toInstall.length === 0) {
  console.log('✅ Todos os componentes recomendados já estão instalados!\n');
  process.exit(0);
}

console.log(`📋 Componentes a instalar: ${toInstall.length}\n`);

toInstall.forEach(comp => {
  console.log(`   • ${comp.name} (${comp.priority})`);
  console.log(`     ${comp.reason}`);
});

if (dryRun) {
  console.log('\n💡 Para instalar, execute sem --dry-run:');
  console.log('   node scripts/install-shadcn-components.js\n');
  process.exit(0);
}

console.log('\n🚀 Iniciando instalação...\n');

let installed = 0;
let failed = 0;

toInstall.forEach(comp => {
  if (installComponent(comp.name)) {
    installed++;
  } else {
    failed++;
  }
});

console.log('\n═══════════════════════════════════════════════════════════');
console.log('📊 RESUMO');
console.log('═══════════════════════════════════════════════════════════\n');
console.log(`✅ Instalados: ${installed}`);
console.log(`❌ Falhas: ${failed}`);
console.log(`📦 Total: ${toInstall.length}\n`);

if (installed > 0) {
  console.log('💡 Próximos passos:');
  console.log('   1. Verificar componentes instalados em components/ui/');
  console.log('   2. Integrar com design tokens');
  console.log('   3. Substituir código customizado\n');
}
