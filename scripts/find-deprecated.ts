/**
 * Script para identificar tipos e funções deprecados no código
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { extname, join } from 'path';

interface DeprecatedItem {
  file: string;
  line: number;
  type: 'type' | 'function' | 'class' | 'interface';
  name: string;
  message: string;
}

const deprecatedItems: DeprecatedItem[] = [];
const skipDirs = [
  'node_modules',
  '.next',
  'dist',
  'build',
  'coverage',
  'test-results',
  'playwright-report',
  '.git',
];

function shouldSkip(filePath: string): boolean {
  return skipDirs.some(dir => filePath.includes(dir));
}

function findDeprecatedInFile(filePath: string): void {
  if (shouldSkip(filePath)) return;

  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Procurar por @deprecated
      if (line.includes('@deprecated')) {
        const lineNum = index + 1;

        // Procurar por tipos deprecados conhecidos
        const deprecatedTypes = [
          'CreatePostDTO',
          'UpdatePostDTO',
          'CreateCommentDTO',
          'UpdateCommentDTO',
          'CreateCategoryDTO',
          'UpdateCategoryDTO',
        ];

        deprecatedTypes.forEach(type => {
          if (content.includes(type)) {
            // Verificar se não é apenas a definição
            const typeDefRegex = new RegExp(
              `export\\s+(type|interface|class)\\s+${type}`
            );
            if (!typeDefRegex.test(content)) {
              deprecatedItems.push({
                file: filePath,
                line: lineNum,
                type: 'type',
                name: type,
                message: line.trim(),
              });
            }
          }
        });

        // Procurar por funções deprecadas conhecidas
        const deprecatedFunctions = ['searchContentSync'];

        deprecatedFunctions.forEach(func => {
          if (content.includes(func)) {
            // Verificar se não é apenas a definição
            const funcDefRegex = new RegExp(
              `export\\s+(async\\s+)?function\\s+${func}`
            );
            if (!funcDefRegex.test(content)) {
              deprecatedItems.push({
                file: filePath,
                line: lineNum,
                type: 'function',
                name: func,
                message: line.trim(),
              });
            }
          }
        });
      }
    });
  } catch (error) {
    // Ignorar erros de leitura
  }
}

function scanDirectory(dir: string): void {
  try {
    const entries = readdirSync(dir);

    entries.forEach(entry => {
      const fullPath = join(dir, entry);

      if (shouldSkip(fullPath)) return;

      try {
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          scanDirectory(fullPath);
        } else if (stat.isFile()) {
          const ext = extname(fullPath);
          if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
            findDeprecatedInFile(fullPath);
          }
        }
      } catch {
        // Ignorar erros
      }
    });
  } catch {
    // Ignorar erros
  }
}

// Escanear diretórios principais
const rootDir = process.cwd();
const scanDirs = ['lib', 'components', 'app', 'hooks'];

console.log('🔍 Procurando por código deprecado...\n');

scanDirs.forEach(dir => {
  const dirPath = join(rootDir, dir);
  try {
    if (statSync(dirPath).isDirectory()) {
      scanDirectory(dirPath);
    }
  } catch {
    // Diretório não existe, ignorar
  }
});

// Remover duplicatas
const uniqueItems = Array.from(
  new Map(deprecatedItems.map(item => [item.file + item.line, item])).values()
);

if (uniqueItems.length === 0) {
  console.log('✅ Nenhum uso de código deprecado encontrado!');
} else {
  console.log(
    `⚠️  Encontrados ${uniqueItems.length} usos de código deprecado:\n`
  );

  // Agrupar por tipo
  const byType = uniqueItems.reduce(
    (acc, item) => {
      const name = item.name;
      if (!acc[name]) {
        acc[name] = [];
      }
      acc[name]!.push(item);
      return acc;
    },
    {} as Record<string, DeprecatedItem[]>
  );

  Object.entries(byType).forEach(([name, items]) => {
    console.log(`\n📌 ${name} (${items.length} uso(s)):`);
    items.forEach(item => {
      console.log(`   ${item.file}:${item.line}`);
    });
  });
}

