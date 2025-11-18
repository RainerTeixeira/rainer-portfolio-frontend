/**
 * Script para Atualizar Memórias do Projeto
 *
 * Este script atualiza automaticamente os arquivos de memória em docs/.memories/
 * com informações atualizadas do projeto.
 *
 * Uso:
 *   npm run memory:update
 *   tsx scripts/08-memoria/update-memory.ts
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const MEMORIES_DIR = join(PROJECT_ROOT, 'docs', '.memories');

interface ProjectInfo {
  name: string;
  version: string;
  description: string;
  framework: string;
  language: string;
  styling: string;
  uiLibrary: string;
  testing: {
    framework: string;
    coverage: string;
    totalTests: number;
  };
  deployment: string;
  structure: {
    tests: string;
    docs: string;
    scripts: string;
    memories: string;
  };
}

/**
 * Lê informações do package.json
 */
function readPackageJson(): any {
  const packagePath = join(PROJECT_ROOT, 'package.json');
  return JSON.parse(readFileSync(packagePath, 'utf-8'));
}

/**
 * Lê informações do README.md para extrair estatísticas
 */
function readReadme(): string {
  const readmePath = join(PROJECT_ROOT, 'README.md');
  if (existsSync(readmePath)) {
    return readFileSync(readmePath, 'utf-8');
  }
  return '';
}

/**
 * Coleta informações do projeto
 */
function collectProjectInfo(): ProjectInfo {
  const pkg = readPackageJson();
  const readme = readReadme();

  // Extrair cobertura de testes do README (se disponível)
  const coverageMatch = readme.match(/Coverage[:\s-]+([\d.]+)%/i);
  const testsMatch = readme.match(/(\d+)\s+test/i);

  return {
    name: pkg.name || 'rainer-portfolio-frontend',
    version: pkg.version || '1.0.0',
    description:
      pkg.description ||
      'Portfólio profissional de Rainer Teixeira - Desenvolvedor Full-Stack',
    framework: 'Next.js 15 + React 19',
    language: 'TypeScript 5.x',
    styling: 'Tailwind CSS 4.x',
    uiLibrary: 'Radix UI',
    testing: {
      framework: 'Jest + Playwright',
      coverage: coverageMatch ? `${coverageMatch[1]}%` : 'N/A',
      totalTests: testsMatch && testsMatch[1] ? parseInt(testsMatch[1], 10) : 0,
    },
    deployment: 'Vercel',
    structure: {
      tests: 'tests/',
      docs: 'docs/',
      scripts: 'scripts/',
      memories: 'docs/.memories/',
    },
  };
}

/**
 * Atualiza initial-memory.json
 */
function updateInitialMemory(): void {
  const info = collectProjectInfo();
  const memoryPath = join(MEMORIES_DIR, 'initial-memory.json');

  if (!existsSync(memoryPath)) {
    console.error(`❌ Arquivo não encontrado: ${memoryPath}`);
    return;
  }

  const memory = JSON.parse(readFileSync(memoryPath, 'utf-8'));

  // Atualizar informações
  memory.lastModified = new Date().toISOString();
  memory.content = `Conhecimento completo do projeto ${info.name} - Portfólio Frontend Next.js v${info.version}`;

  // Atualizar entidade do projeto
  const projectEntity = memory.entities.find(
    (e: any) => e.fullName === 'rainer-portfolio-frontend'
  );
  if (projectEntity) {
    projectEntity.observations = [
      `Portfólio Frontend desenvolvido com ${info.framework}`,
      `Estilização com ${info.styling}`,
      `UI Library: ${info.uiLibrary}`,
      `Deploy com ${info.deployment}`,
      `${info.testing.coverage} de cobertura de testes com ${info.testing.totalTests} casos de teste`,
      'PWA Universal (iOS, Android, Desktop)',
      'Acessibilidade WCAG 2.1 AA',
      'Performance Lighthouse 95+',
      `Documentação completa organizada em ${info.structure.docs}`,
      `Estrutura organizada: ${info.structure.tests} (testes), ${info.structure.docs} (documentação), ${info.structure.scripts} (utilitários)`,
      `Memórias do projeto em ${info.structure.memories}`,
      'REGRAS DE ORGANIZAÇÃO: Todas as documentações geradas em markdown (.md) devem ser salvas na pasta docs/',
    ];
  }

  writeFileSync(memoryPath, JSON.stringify(memory, null, 2), 'utf-8');
  console.log(`✅ ${memoryPath} atualizado`);
}

/**
 * Atualiza technical-details.json
 */
function updateTechnicalDetails(): void {
  const info = collectProjectInfo();
  const detailsPath = join(MEMORIES_DIR, 'technical-details.json');

  if (!existsSync(detailsPath)) {
    console.error(`❌ Arquivo não encontrado: ${detailsPath}`);
    return;
  }

  const details = JSON.parse(readFileSync(detailsPath, 'utf-8'));

  // Atualizar informações
  details.lastModified = new Date().toISOString();

  // Atualizar seção de organização
  if (!details.technicalDetails.organization) {
    details.technicalDetails.organization = {};
  }
  details.technicalDetails.organization.structure = {
    tests: `${info.structure.tests} - Todos os testes organizados (unit, integration, e2e)`,
    testCoverage: `${info.structure.tests}coverage/ - Relatórios de cobertura`,
    testReports: `${info.structure.tests}test-reports/ - Relatórios de execução`,
    testScripts: `${info.structure.tests}scripts/ - Scripts Node.js de teste manual`,
    docs: `${info.structure.docs} - Toda documentação organizada`,
    memories: `${info.structure.memories} - Memórias do projeto (code-analysis, initial-memory, technical-details)`,
    scripts: `${info.structure.scripts} - Scripts utilitários organizados`,
  };

  // Adicionar regras de organização
  if (!details.technicalDetails.organization.rules) {
    details.technicalDetails.organization.rules = {};
  }
  details.technicalDetails.organization.rules.documentation = {
    markdown: `Todas as documentações geradas em markdown (.md) devem ser salvas na pasta ${info.structure.docs}`,
    reason: 'Manter organização e facilitar navegação',
    enforcement:
      'Obrigatório - documentações .md na raiz devem ser movidas para docs/',
  };

  writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf-8');
  console.log(`✅ ${detailsPath} atualizado`);
}

/**
 * Atualiza code-analysis.json
 */
function updateCodeAnalysis(): void {
  const info = collectProjectInfo();
  const analysisPath = join(MEMORIES_DIR, 'code-analysis.json');

  if (!existsSync(analysisPath)) {
    console.error(`❌ Arquivo não encontrado: ${analysisPath}`);
    return;
  }

  const analysis = JSON.parse(readFileSync(analysisPath, 'utf-8'));

  // Atualizar entidade do projeto
  const projectEntity = analysis.entities.find(
    (e: any) => e.fullName === 'Portfolio Frontend Next.js'
  );

  if (projectEntity) {
    projectEntity.observations = [
      `Portfólio Frontend moderno com ${info.framework}`,
      `Versão: ${info.version} (package.json)`,
      `Última análise: ${new Date().toLocaleDateString('pt-BR')}`,
      'Status: Production Ready, Enterprise Grade, Fully Documented, Type-Safe, Tested',
      `Framework: ${info.framework}`,
      `Language: ${info.language} com strict mode`,
      `Styling: ${info.styling}`,
      `UI Library: ${info.uiLibrary}`,
      'State Management: TanStack React Query + Context API',
      'Forms: React Hook Form + Zod',
      'PWA: Universal (iOS, Android, Desktop)',
      'Performance: Lighthouse 95+',
      'Acessibilidade: WCAG 2.1 AA',
      `Testing: ${info.testing.framework}`,
      `Deployment: ${info.deployment}`,
      `Estrutura organizada: ${info.structure.tests} (testes), ${info.structure.docs} (documentação)`,
      `Memórias em ${info.structure.memories}`,
      `REGRAS: Todas as documentações markdown (.md) devem ser salvas em ${info.structure.docs}`,
    ];
  }

  writeFileSync(analysisPath, JSON.stringify(analysis, null, 2), 'utf-8');
  console.log(`✅ ${analysisPath} atualizado`);
}

/**
 * Função principal
 */
function main(): void {
  console.log('🔄 Atualizando memórias do projeto...\n');

  try {
    updateInitialMemory();
    updateTechnicalDetails();
    updateCodeAnalysis();

    console.log('\n✅ Todas as memórias foram atualizadas com sucesso!');
    console.log(`📁 Localização: ${MEMORIES_DIR}`);
  } catch (error) {
    console.error('❌ Erro ao atualizar memórias:', error);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { collectProjectInfo, main };
