/**
 * Script para Ler Memórias do Projeto
 *
 * Este script lê e exibe as informações das memórias do projeto.
 * Pode ser usado por ferramentas MCP ou outros sistemas para carregar contexto.
 *
 * Uso:
 *   npm run memory:read
 *   tsx scripts/08-memoria/read-memory.ts [tipo]
 *
 * Tipos disponíveis:
 *   - all (padrão): Todas as memórias
 *   - initial: Apenas initial-memory.json
 *   - technical: Apenas technical-details.json
 *   - code: Apenas code-analysis.json
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const PROJECT_ROOT = process.cwd();
const MEMORIES_DIR = join(PROJECT_ROOT, 'docs', '.memories');

interface MemoryPaths {
  initial: string;
  technical: string;
  code: string;
}

/**
 * Caminhos dos arquivos de memória
 */
const MEMORY_PATHS: MemoryPaths = {
  initial: join(MEMORIES_DIR, 'initial-memory.json'),
  technical: join(MEMORIES_DIR, 'technical-details.json'),
  code: join(MEMORIES_DIR, 'code-analysis.json'),
};

/**
 * Lê um arquivo de memória
 */
function readMemory(path: string): any | null {
  if (!existsSync(path)) {
    console.error(`❌ Arquivo não encontrado: ${path}`);
    return null;
  }

  try {
    return JSON.parse(readFileSync(path, 'utf-8'));
  } catch (error) {
    console.error(`❌ Erro ao ler arquivo ${path}:`, error);
    return null;
  }
}

/**
 * Lê todas as memórias
 */
function readAllMemories(): Record<string, any> {
  return {
    initial: readMemory(MEMORY_PATHS.initial),
    technical: readMemory(MEMORY_PATHS.technical),
    code: readMemory(MEMORY_PATHS.code),
  };
}

/**
 * Formata memória para exibição
 */
function formatMemory(memory: any, type: string): string {
  if (!memory) {
    return `❌ Memória ${type} não encontrada`;
  }

  let output = `\n📋 ${type.toUpperCase()}\n`;
  output += '═'.repeat(60) + '\n';

  if (type === 'initial' && memory.entities) {
    const project = memory.entities.find(
      (e: any) => e.fullName === 'rainer-portfolio-frontend'
    );
    if (project) {
      output += `Projeto: ${project.fullName}\n`;
      output += `Última atualização: ${memory.lastModified || 'N/A'}\n\n`;
      output += 'Observações:\n';
      project.observations?.slice(0, 5).forEach((obs: string) => {
        output += `  • ${obs}\n`;
      });
    }
  } else if (type === 'technical' && memory.technicalDetails) {
    output += `Páginas: ${memory.technicalDetails.pages?.total || 'N/A'}\n`;
    output += `Componentes: ${memory.technicalDetails.components?.total || 'N/A'}\n`;
    output += `Última atualização: ${memory.lastModified || 'N/A'}\n\n`;
    if (memory.technicalDetails.organization) {
      output += 'Estrutura:\n';
      Object.entries(
        memory.technicalDetails.organization.structure || {}
      ).forEach(([key, value]) => {
        output += `  • ${key}: ${value}\n`;
      });
    }
  } else if (type === 'code' && memory.entities) {
    const project = memory.entities.find(
      (e: any) => e.fullName === 'Portfolio Frontend Next.js'
    );
    if (project) {
      output += `Projeto: ${project.fullName}\n`;
      output += `Tipo: ${project.entityType}\n\n`;
      output += 'Observações:\n';
      project.observations?.slice(0, 5).forEach((obs: string) => {
        output += `  • ${obs}\n`;
      });
    }
  }

  return output;
}

/**
 * Função principal
 */
function main(): void {
  const type = process.argv[2] || 'all';

  console.log('📖 Lendo memórias do projeto...\n');

  switch (type) {
    case 'initial':
      {
        const memory = readMemory(MEMORY_PATHS.initial);
        console.log(formatMemory(memory, 'initial'));
      }
      break;

    case 'technical':
      {
        const memory = readMemory(MEMORY_PATHS.technical);
        console.log(formatMemory(memory, 'technical'));
      }
      break;

    case 'code':
      {
        const memory = readMemory(MEMORY_PATHS.code);
        console.log(formatMemory(memory, 'code'));
      }
      break;

    case 'all':
    default:
      {
        const memories = readAllMemories();
        console.log(formatMemory(memories.initial, 'initial'));
        console.log(formatMemory(memories.technical, 'technical'));
        console.log(formatMemory(memories.code, 'code'));
      }
      break;
  }

  console.log(`\n📁 Localização: ${MEMORIES_DIR}`);
}

/**
 * Exporta memórias como objeto (para uso em outros scripts)
 */
export function getMemories(): Record<string, any> {
  return readAllMemories();
}

/**
 * Exporta memória específica
 */
export function getMemory(type: 'initial' | 'technical' | 'code'): any {
  const path = MEMORY_PATHS[type];
  return readMemory(path);
}

// Executar se chamado diretamente
if (require.main === module) {
  main();
}

export { readAllMemories, readMemory };

