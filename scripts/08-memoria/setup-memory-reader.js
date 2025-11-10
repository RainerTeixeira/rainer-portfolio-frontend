/**
 * Setup Memory Reader - Configuração para Leitura Automática
 *
 * Este script configura o ambiente para sempre carregar memórias automaticamente.
 * Pode ser executado no início de sessões ou integrado em ferramentas.
 *
 * Uso:
 *   node scripts/setup-memory-reader.js
 */

const { readFileSync, existsSync } = require('fs');
const { join } = require('path');

const PROJECT_ROOT = process.cwd();
const MEMORIES_DIR = join(PROJECT_ROOT, 'docs', '.memories');

/**
 * Carrega memórias do projeto
 */
function loadMemories() {
  const memories = {
    loadedAt: new Date().toISOString(),
    initial: null,
    technical: null,
    code: null,
  };

  // Carregar initial-memory.json
  const initialPath = join(MEMORIES_DIR, 'initial-memory.json');
  if (existsSync(initialPath)) {
    try {
      memories.initial = JSON.parse(readFileSync(initialPath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️ Erro ao carregar initial-memory.json:', error.message);
    }
  }

  // Carregar technical-details.json
  const technicalPath = join(MEMORIES_DIR, 'technical-details.json');
  if (existsSync(technicalPath)) {
    try {
      memories.technical = JSON.parse(readFileSync(technicalPath, 'utf-8'));
    } catch (error) {
      console.warn(
        '⚠️ Erro ao carregar technical-details.json:',
        error.message
      );
    }
  }

  // Carregar code-analysis.json
  const codePath = join(MEMORIES_DIR, 'code-analysis.json');
  if (existsSync(codePath)) {
    try {
      memories.code = JSON.parse(readFileSync(codePath, 'utf-8'));
    } catch (error) {
      console.warn('⚠️ Erro ao carregar code-analysis.json:', error.message);
    }
  }

  return memories;
}

/**
 * Exibe resumo das memórias carregadas
 */
function displaySummary(memories) {
  console.log('\n📖 Memórias do Projeto Carregadas\n');
  console.log('═'.repeat(60));

  if (memories.initial) {
    const project = memories.initial.entities?.find(
      e => e.fullName === 'rainer-portfolio-frontend'
    );
    if (project) {
      console.log(`\n📋 Projeto: ${project.fullName}`);
      console.log(
        `   Última atualização: ${memories.initial.lastModified || 'N/A'}`
      );
    }
  }

  if (memories.technical) {
    console.log(
      `\n🔧 Componentes: ${memories.technical.technicalDetails?.components?.total || 'N/A'}`
    );
    console.log(
      `   Páginas: ${memories.technical.technicalDetails?.pages?.total || 'N/A'}`
    );
    console.log(
      `   Última atualização: ${memories.technical.lastModified || 'N/A'}`
    );
  }

  if (memories.code) {
    const project = memories.code.entities?.find(
      e => e.fullName === 'Portfolio Frontend Next.js'
    );
    if (project) {
      console.log(`\n🏗️  Arquitetura: ${project.entityType}`);
      console.log(
        `   Status: ${project.observations?.find(o => o.includes('Status:')) || 'N/A'}`
      );
    }
  }

  console.log('\n' + '═'.repeat(60));
  console.log(`\n✅ Memórias carregadas com sucesso!`);
  console.log(`📁 Localização: ${MEMORIES_DIR}\n`);
}

// Executar se chamado diretamente
if (require.main === module) {
  const memories = loadMemories();
  displaySummary(memories);

  // Exportar para uso global (se disponível)
  if (typeof global !== 'undefined') {
    global.projectMemories = memories;
    console.log('💾 Memórias disponíveis em global.projectMemories\n');
  }
}

module.exports = { loadMemories, displaySummary };
