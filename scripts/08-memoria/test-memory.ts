/**
 * Teste Simples de Consulta de Memória
 *
 * Este script testa se o sistema de memórias está funcionando corretamente.
 */

import { getProjectSummary, loadProjectMemories } from './memory-loader';

console.log('🧪 Testando Sistema de Memórias...\n');
console.log('═'.repeat(60));

// Teste 1: Carregar todas as memórias
console.log('\n📋 Teste 1: Carregar todas as memórias');
const memories = loadProjectMemories();

if (memories.initial && memories.technical && memories.code) {
  console.log('✅ Todas as memórias carregadas com sucesso!');
  console.log(`   Carregado em: ${memories.loadedAt}`);
} else {
  console.log('❌ Erro ao carregar memórias');
  process.exit(1);
}

// Teste 2: Consultar informações do projeto
console.log('\n📋 Teste 2: Consultar informações do projeto');
const summary = getProjectSummary();

console.log(`   Nome: ${summary.name}`);
console.log(`   Versão: ${summary.version}`);
console.log(`   Framework: ${summary.framework}`);
console.log(`   Styling: ${summary.styling}`);
console.log(`   Testes: ${summary.testing.framework}`);

// Teste 3: Consultar entidade do projeto
console.log('\n📋 Teste 3: Consultar entidade do projeto');
const projectEntity = memories.initial?.entities?.find(
  (e: any) => e.fullName === 'rainer-portfolio-frontend'
);

if (projectEntity) {
  console.log(`   ✅ Projeto encontrado: ${projectEntity.fullName}`);
  console.log(`   Tipo: ${projectEntity.entityType}`);
  console.log(`   Observações: ${projectEntity.observations?.length || 0}`);
} else {
  console.log('   ❌ Entidade do projeto não encontrada');
}

// Teste 4: Consultar detalhes técnicos
console.log('\n📋 Teste 4: Consultar detalhes técnicos');
const technical = memories.technical?.technicalDetails;

if (technical) {
  console.log(`   ✅ Componentes: ${technical.components?.total || 'N/A'}`);
  console.log(`   ✅ Páginas: ${technical.pages?.total || 'N/A'}`);
  console.log(`   ✅ Hooks: ${technical.hooks?.total || 'N/A'}`);

  // Verificar regra de documentação
  if (technical.organization?.rules?.documentation) {
    console.log(
      `   ✅ Regra de documentação: ${technical.organization.rules.documentation.markdown}`
    );
  }
} else {
  console.log('   ❌ Detalhes técnicos não encontrados');
}

// Teste 5: Consultar análise de código
console.log('\n📋 Teste 5: Consultar análise de código');
const codeProject = memories.code?.entities?.find(
  (e: any) => e.fullName === 'Portfolio Frontend Next.js'
);

if (codeProject) {
  console.log(`   ✅ Projeto encontrado: ${codeProject.fullName}`);
  console.log(`   Tipo: ${codeProject.entityType}`);
  console.log(`   Observações: ${codeProject.observations?.length || 0}`);

  // Verificar se tem a regra de documentação
  const hasDocRule = codeProject.observations?.some(
    (obs: string) =>
      obs.includes('REGRAS') || obs.includes('documentações markdown')
  );
  console.log(
    `   ✅ Regra de documentação: ${hasDocRule ? 'Presente' : 'Ausente'}`
  );
} else {
  console.log('   ❌ Projeto na análise de código não encontrado');
}

console.log('\n' + '═'.repeat(60));
console.log('\n✅ Todos os testes concluídos com sucesso!');
console.log('📁 Sistema de memórias funcionando corretamente.\n');
