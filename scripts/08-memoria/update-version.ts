/**
 * Script Automático de Atualização de Versão e Memórias
 *
 * Este script:
 * 1. Detecta mudanças de versão no package.json
 * 2. Atualiza automaticamente todas as referências de versão nas memórias
 * 3. Atualiza lastModified em todos os arquivos de memória
 * 4. Gera log de mudanças
 *
 * Uso:
 *   npm run version:update
 *   tsx scripts/08-memoria/update-version.ts
 */

import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { collectProjectInfo, main as updateMemories } from './update-memory.js';

const PROJECT_ROOT = process.cwd();
const MEMORIES_DIR = join(PROJECT_ROOT, 'docs', '.memories');
const PACKAGE_JSON_PATH = join(PROJECT_ROOT, 'package.json');
const VERSION_CACHE_PATH = join(MEMORIES_DIR, '.version-cache.json');

interface VersionCache {
  lastVersion: string;
  lastUpdated: string;
}

/**
 * Lê a versão atual do package.json
 */
function getCurrentVersion(): string {
  const pkg = JSON.parse(readFileSync(PACKAGE_JSON_PATH, 'utf-8'));
  return pkg.version;
}

/**
 * Lê a versão cacheada (última versão processada)
 */
function getCachedVersion(): VersionCache | null {
  if (!existsSync(VERSION_CACHE_PATH)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(VERSION_CACHE_PATH, 'utf-8'));
  } catch {
    return null;
  }
}

/**
 * Salva a versão atual no cache
 */
function saveVersionCache(version: string): void {
  const cache: VersionCache = {
    lastVersion: version,
    lastUpdated: new Date().toISOString(),
  };
  writeFileSync(VERSION_CACHE_PATH, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Atualiza versão em initial-memory.json
 */
function updateVersionInInitialMemory(version: string): void {
  const memoryPath = join(MEMORIES_DIR, 'initial-memory.json');
  if (!existsSync(memoryPath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${memoryPath}`);
    return;
  }

  const memory = JSON.parse(readFileSync(memoryPath, 'utf-8'));
  const now = new Date().toISOString();

  // Atualizar lastModified
  memory.lastModified = now;

  // Atualizar content com nova versão
  memory.content = memory.content.replace(/v\d+\.\d+\.\d+/, `v${version}`);

  // Atualizar entidade do projeto
  const projectEntity = memory.entities?.find(
    (e: any) => e.fullName === 'rainer-portfolio-frontend'
  );
  if (projectEntity) {
    // Atualizar observações que mencionam versão
    projectEntity.observations = projectEntity.observations.map((obs: string) => {
      if (obs.includes('Versão:') || obs.includes('v2.0.0') || obs.includes('v2.1.0')) {
        return obs.replace(/v?\d+\.\d+\.\d+.*?Enterprise Edition/, `v${version} Enterprise Edition`);
      }
      if (obs.includes('2.0.0')) {
        return obs.replace(/2\.0\.0/g, version);
      }
      return obs;
    });

    // Atualizar context
    if (memory.context) {
      memory.context.projectVersion = `${version} Enterprise Edition`;
    }
  }

  writeFileSync(memoryPath, JSON.stringify(memory, null, 2), 'utf-8');
  console.log(`✅ ${memoryPath} - Versão atualizada para ${version}`);
}

/**
 * Atualiza versão em technical-details.json
 */
function updateVersionInTechnicalDetails(version: string): void {
  const detailsPath = join(MEMORIES_DIR, 'technical-details.json');
  if (!existsSync(detailsPath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${detailsPath}`);
    return;
  }

  const details = JSON.parse(readFileSync(detailsPath, 'utf-8'));
  const now = new Date().toISOString();

  // Atualizar lastModified
  details.lastModified = now;

  // Atualizar content com nova versão
  details.content = details.content.replace(/v\d+\.\d+\.\d+/, `v${version}`);

  // Atualizar versionSync se existir
  if (details.technicalDetails?.documentation?.versionSync) {
    details.technicalDetails.documentation.versionSync.packageJson = version;
    details.technicalDetails.documentation.versionSync.projectOverview = `${version} Enterprise Edition`;
  }

  writeFileSync(detailsPath, JSON.stringify(details, null, 2), 'utf-8');
  console.log(`✅ ${detailsPath} - Versão atualizada para ${version}`);
}

/**
 * Atualiza versão em code-analysis.json
 */
function updateVersionInCodeAnalysis(version: string): void {
  const analysisPath = join(MEMORIES_DIR, 'code-analysis.json');
  if (!existsSync(analysisPath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${analysisPath}`);
    return;
  }

  const analysis = JSON.parse(readFileSync(analysisPath, 'utf-8'));

  // Atualizar entidade do projeto
  const projectEntity = analysis.entities?.find(
    (e: any) => e.fullName === 'Portfolio Frontend Next.js'
  );

  if (projectEntity) {
    // Atualizar observações que mencionam versão
    projectEntity.observations = projectEntity.observations.map((obs: string) => {
      if (obs.includes('Versão:')) {
        return `Versão: ${version} (package.json)`;
      }
      if (obs.includes('v2.0.0') || obs.includes('v2.1.0')) {
        return obs.replace(/v\d+\.\d+\.\d+/, `v${version}`);
      }
      return obs;
    });
  }

  writeFileSync(analysisPath, JSON.stringify(analysis, null, 2), 'utf-8');
  console.log(`✅ ${analysisPath} - Versão atualizada para ${version}`);
}

/**
 * Atualiza versão em consolidated-memory.json
 */
function updateVersionInConsolidatedMemory(version: string): void {
  const consolidatedPath = join(MEMORIES_DIR, 'consolidated-memory.json');
  if (!existsSync(consolidatedPath)) {
    console.warn(`⚠️ Arquivo não encontrado: ${consolidatedPath}`);
    return;
  }

  const consolidated = JSON.parse(readFileSync(consolidatedPath, 'utf-8'));
  const now = new Date().toISOString();

  // Atualizar lastModified
  consolidated.lastModified = now;

  // Atualizar project.version
  if (consolidated.project) {
    consolidated.project.version = version;
  }

  // Atualizar entidades
  consolidated.entities?.forEach((entity: any) => {
    if (entity.fullName === 'rainer-portfolio-frontend' || entity.fullName === 'Portfolio Frontend Next.js') {
      entity.observations = entity.observations.map((obs: string) => {
        if (obs.includes('Versão:') || obs.includes('v2.0.0') || obs.includes('v2.1.0')) {
          return obs.replace(/v?\d+\.\d+\.\d+.*?Enterprise Edition/, `v${version} Enterprise Edition`);
        }
        if (obs.includes('2.0.0')) {
          return obs.replace(/2\.0\.0/g, version);
        }
        return obs;
      });
    }
  });

  // Atualizar summary
  if (consolidated.summary) {
    consolidated.summary = consolidated.summary.replace(/v\d+\.\d+\.\d+/, `v${version}`);
  }

  writeFileSync(consolidatedPath, JSON.stringify(consolidated, null, 2), 'utf-8');
  console.log(`✅ ${consolidatedPath} - Versão atualizada para ${version}`);
}

/**
 * Função principal - Atualiza versão em todas as memórias
 */
function updateVersionInAllMemories(version: string): void {
  console.log(`\n🔄 Atualizando versão para ${version} em todas as memórias...\n`);

  updateVersionInInitialMemory(version);
  updateVersionInTechnicalDetails(version);
  updateVersionInCodeAnalysis(version);
  updateVersionInConsolidatedMemory(version);

  console.log(`\n✅ Todas as memórias foram atualizadas para versão ${version}!`);
}

/**
 * Função principal - Detecta mudança de versão e atualiza automaticamente
 */
function main(): void {
  console.log('🔍 Verificando versão do projeto...\n');

  const currentVersion = getCurrentVersion();
  const cached = getCachedVersion();

  console.log(`📦 Versão atual no package.json: ${currentVersion}`);

  if (cached) {
    console.log(`📋 Versão cacheada: ${cached.lastVersion}`);
    console.log(`📅 Última atualização: ${cached.lastUpdated}`);

    if (cached.lastVersion === currentVersion) {
      console.log('\n✅ Versão não mudou. Nada a fazer.');
      return;
    }

    console.log(`\n🔄 Versão mudou de ${cached.lastVersion} para ${currentVersion}`);
  } else {
    console.log('\n🆕 Primeira execução. Atualizando memórias...');
  }

  // Atualizar versão em todas as memórias
  updateVersionInAllMemories(currentVersion);

  // Executar atualização completa de memórias
  console.log('\n🔄 Executando atualização completa de memórias...\n');
  try {
    updateMemories();
  } catch (error) {
    console.warn('⚠️ Erro ao executar atualização completa de memórias:', error);
    console.log('✅ Versão atualizada, mas atualização completa falhou. Execute manualmente: pnpm run memory:update');
  }

  // Salvar versão no cache
  saveVersionCache(currentVersion);

  console.log(`\n✅ Processo concluído! Versão ${currentVersion} sincronizada em todas as memórias.`);
}

// Executar se chamado diretamente
const isMainModule = process.argv[1] && (
  import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/')) || 
  process.argv[1].includes('update-version.ts')
);
if (isMainModule) {
  main();
}

export { main, updateVersionInAllMemories, getCurrentVersion };


