/**
 * Script para substituir todas as ocorrências de bg-gradient-to-* por GRADIENT_DIRECTIONS
 * 
 * Uso: node scripts/replace-gradients.js
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ROOT_DIR = join(__dirname, '..');

// Mapeamento de substituições
const REPLACEMENTS = {
  'bg-gradient-to-r': 'GRADIENT_DIRECTIONS.TO_RIGHT',
  'bg-gradient-to-l': 'GRADIENT_DIRECTIONS.TO_LEFT',
  'bg-gradient-to-t': 'GRADIENT_DIRECTIONS.TO_TOP',
  'bg-gradient-to-b': 'GRADIENT_DIRECTIONS.TO_BOTTOM',
  'bg-gradient-to-br': 'GRADIENT_DIRECTIONS.TO_BR',
  'bg-gradient-to-bl': 'GRADIENT_DIRECTIONS.TO_BL',
  'bg-gradient-to-tr': 'GRADIENT_DIRECTIONS.TO_TR',
  'bg-gradient-to-tl': 'GRADIENT_DIRECTIONS.TO_TL',
};

// Diretórios e arquivos a ignorar
const IGNORE_DIRS = ['node_modules', '.next', 'dist', '.git', 'scripts'];
const EXTENSIONS = ['.tsx', '.ts', '.jsx', '.js'];

function shouldProcessFile(filePath) {
  const ext = extname(filePath);
  return EXTENSIONS.includes(ext);
}

function shouldIgnoreDir(dirName) {
  return IGNORE_DIRS.includes(dirName);
}

function processFile(filePath) {
  let content = readFileSync(filePath, 'utf-8');
  let modified = false;
  let needsImport = false;

  // Verificar se precisa adicionar import
  if (!content.includes('GRADIENT_DIRECTIONS') && /bg-gradient-to-/.test(content)) {
    needsImport = true;
  }

  // Fazer substituições
  for (const [oldValue, newValue] of Object.entries(REPLACEMENTS)) {
    const regex = new RegExp(oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    if (regex.test(content)) {
      // Substituir em strings template
      content = content.replace(
        new RegExp(`(['"\`])${oldValue}(['"\`])`, 'g'),
        (match, quote1, quote2) => {
          modified = true;
          return `${quote1}\${${newValue}}${quote2}`;
        }
      );
      
      // Substituir em className (sem aspas)
      content = content.replace(
        new RegExp(`(className=\\{[^}]*?)${oldValue}([^}]*?\\})`, 'g'),
        (match, before, after) => {
          modified = true;
          return `${before}${newValue}${after}`;
        }
      );
    }
  }

  // Adicionar import se necessário
  if (needsImport && modified) {
    const importRegex = /import\s+.*?\s+from\s+['"]@rainersoft\/design-tokens['"]/;
    if (importRegex.test(content)) {
      // Adicionar GRADIENT_DIRECTIONS ao import existente
      content = content.replace(
        /(import\s+\{([^}]+)\}\s+from\s+['"]@rainersoft\/design-tokens['"])/,
        (match, fullImport, imports) => {
          if (!imports.includes('GRADIENT_DIRECTIONS')) {
            return `import {${imports.trim()}, GRADIENT_DIRECTIONS} from '@rainersoft/design-tokens'`;
          }
          return match;
        }
      );
    } else {
      // Adicionar novo import
      const lastImportIndex = content.lastIndexOf('import ');
      if (lastImportIndex !== -1) {
        const nextLineIndex = content.indexOf('\n', lastImportIndex);
        content = content.slice(0, nextLineIndex + 1) +
          "import { GRADIENT_DIRECTIONS } from '@rainersoft/design-tokens';\n" +
          content.slice(nextLineIndex + 1);
      }
    }
  }

  if (modified || needsImport) {
    writeFileSync(filePath, content, 'utf-8');
    console.log(`✅ Processado: ${filePath}`);
    return true;
  }

  return false;
}

function walkDirectory(dirPath) {
  const entries = readdirSync(dirPath);

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (!shouldIgnoreDir(entry)) {
        walkDirectory(fullPath);
      }
    } else if (stat.isFile() && shouldProcessFile(fullPath)) {
      processFile(fullPath);
    }
  }
}

console.log('🔄 Iniciando substituição de bg-gradient-to-* por GRADIENT_DIRECTIONS...\n');
walkDirectory(ROOT_DIR);
console.log('\n✅ Processamento concluído!');

