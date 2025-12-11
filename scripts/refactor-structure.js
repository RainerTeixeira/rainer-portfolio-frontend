#!/usr/bin/env node

/**
 * Script de Refatoração da Estrutura do Frontend
 * 
 * Reorganiza as pastas para separar responsabilidades:
 * - Frontend: apenas domínio do portfolio
 * - Bibliotecas: componentes genéricos, utils, design tokens
 */

const fs = require('fs');
const path = require('path');

const BASE_DIR = __dirname;
const FRONTEND_DIR = path.dirname(BASE_DIR);

// Nova estrutura proposta
const NEW_STRUCTURE = {
  // Components específicos do portfolio (manter)
  portfolioComponents: {
    from: ['components/home', 'components/sobre', 'components/contato', 'components/blog', 'components/dashboard'],
    to: 'components/domain'
  },
  
  // Components de layout (manter no frontend)
  layoutComponents: {
    from: ['components/layout'],
    to: 'components/layout'
  },
  
  // Components que podem ir para @rainersoft/ui
  genericComponents: {
    candidates: [
      'components/ui',
      'components/forms',
      'components/feedback',
      'components/navigation'
    ]
  },
  
  // Constants reorganizadas
  constants: {
    content: {
      from: ['constants/home', 'constants/sobre', 'constants/contato', 'constants/blog'],
      to: 'constants/content'
    },
    metadata: {
      from: ['constants/comum'],
      to: 'constants/metadata'
    }
  },
  
  // Utils específicas do frontend (manter)
  frontendUtils: {
    from: ['lib/api', 'lib/auth', 'lib/analytics'],
    to: 'lib'
  },
  
  // Utils que podem ir para @rainersoft/utils
  genericUtils: {
    candidates: ['lib/utils']
  }
};

/**
 * Verifica se um diretório existe
 */
function dirExists(dir) {
  return fs.existsSync(dir) && fs.statSync(dir).isDirectory();
}

/**
 * Cria diretório se não existir
 */
function ensureDir(dir) {
  if (!dirExists(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Criado diretório: ${dir}`);
  }
}

/**
 * Move diretório com verificação
 */
function moveDir(from, to) {
  const fromPath = path.join(FRONTEND_DIR, from);
  const toPath = path.join(FRONTEND_DIR, to);
  
  if (!dirExists(fromPath)) {
    console.log(`⚠️  Diretório não existe: ${from}`);
    return false;
  }
  
  ensureDir(path.dirname(toPath));
  
  try {
    fs.renameSync(fromPath, toPath);
    console.log(`✅ Movido: ${from} → ${to}`);
    return true;
  } catch (error) {
    console.log(`❌ Erro ao mover ${from}: ${error.message}`);
    return false;
  }
}

/**
 * Analisa componentes para identificar candidatos a migração
 */
function analyzeComponents() {
  console.log('\n📊 Analisando componentes...');
  
  const componentsDir = path.join(FRONTEND_DIR, 'components');
  if (!dirExists(componentsDir)) {
    console.log('❌ Diretório components não encontrado');
    return;
  }
  
  const items = fs.readdirSync(componentsDir);
  const analysis = {
    portfolio: [],
    generic: [],
    unknown: []
  };
  
  items.forEach(item => {
    const itemPath = path.join(componentsDir, item);
    if (!fs.statSync(itemPath).isDirectory()) return;
    
    // Heurística para classificar componentes
    if (['home', 'sobre', 'contato', 'blog', 'dashboard'].includes(item)) {
      analysis.portfolio.push(item);
    } else if (['ui', 'forms', 'feedback', 'navigation', 'layout'].includes(item)) {
      analysis.generic.push(item);
    } else {
      analysis.unknown.push(item);
    }
  });
  
  console.log('\n📋 Resultado da Análise:');
  console.log(`  Componentes Portfolio (manter): ${analysis.portfolio.join(', ')}`);
  console.log(`  Componentes Genéricos (migrar): ${analysis.generic.join(', ')}`);
  console.log(`  Componentes Unknown (verificar): ${analysis.unknown.join(', ')}`);
  
  return analysis;
}

/**
 * Reorganiza as constantes
 */
function reorganizeConstants() {
  console.log('\n📁 Reorganizando constantes...');
  
  // Criar nova estrutura
  ensureDir(path.join(FRONTEND_DIR, 'constants/content'));
  ensureDir(path.join(FRONTEND_DIR, 'constants/metadata'));
  
  // Mover constantes de conteúdo
  const contentDirs = ['home', 'sobre', 'contato', 'blog'];
  contentDirs.forEach(dir => {
    const from = `constants/${dir}`;
    const to = `constants/content/${dir}`;
    moveDir(from, to);
  });
  
  // Mover constantes comuns
  const from = 'constants/comum';
  const to = 'constants/metadata/comum';
  moveDir(from, to);
}

/**
 * Atualiza imports nos arquivos
 */
function updateImports() {
  console.log('\n🔄 Atualizando imports...');
  
  // TODO: Implementar atualização automática de imports
  console.log('⚠️  Atualização de imports precisa ser feita manualmente');
  console.log('   Use: find . -name "*.ts" -o -name "*.tsx" | xargs grep -l "constants/"');
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Iniciando refatoração da estrutura do frontend...\n');
  
  // Analisar estrutura atual
  const analysis = analyzeComponents();
  
  // Reorganizar constantes
  reorganizeConstants();
  
  // Criar diretórios da nova estrutura
  console.log('\n📁 Criando nova estrutura...');
  ensureDir(path.join(FRONTEND_DIR, 'components/domain'));
  ensureDir(path.join(FRONTEND_DIR, 'components/features'));
  
  // Mover componentes de domínio
  if (analysis) {
    analysis.portfolio.forEach(dir => {
      const from = `components/${dir}`;
      const to = `components/domain/${dir}`;
      moveDir(from, to);
    });
  }
  
  // Atualizar imports
  updateImports();
  
  console.log('\n✅ Refatoração concluída!');
  console.log('\n📝 Próximos passos:');
  console.log('1. Verificar se os movimentos foram corretos');
  console.log('2. Atualizar imports manualmente');
  console.log('3. Rodar testes para garantir funcionamento');
  console.log('4. Migrar componentes genéricos para @rainersoft/ui');
}

// Executar script
if (require.main === module) {
  main();
}

module.exports = { main, analyzeComponents, reorganizeConstants };
