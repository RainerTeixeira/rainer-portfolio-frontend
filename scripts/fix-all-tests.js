#!/usr/bin/env node

/**
 * Script para corrigir automaticamente problemas comuns nos testes
 */

import { readFile, writeFile } from 'fs/promises';
import { glob } from 'glob';
import { join } from 'path';

const rootDir = process.cwd();
const testsDir = join(rootDir, 'tests');

// Padrões de correção
const fixes = [
  // Corrigir isLoading para loading em hooks que retornam loading
  {
    pattern: /expect\(result\.current\)\.toHaveProperty\('isLoading'\)/g,
    replacement: "expect(result.current).toHaveProperty('loading')",
    condition: content =>
      content.includes('useCategories') ||
      content.includes('useSubcategories') ||
      content.includes('useComments') ||
      (content.includes('usePosts') && !content.includes('React Query')),
    files: ['**/hooks/**/*.test.ts', '**/hooks/**/*.test.tsx'],
  },
  {
    pattern: /typeof result\.current\.isLoading/g,
    replacement: 'typeof result.current.loading',
    condition: content =>
      content.includes('useCategories') ||
      content.includes('useSubcategories') ||
      content.includes('useComments') ||
      (content.includes('usePosts') && !content.includes('React Query')),
    files: ['**/hooks/**/*.test.ts', '**/hooks/**/*.test.tsx'],
  },
  // Corrigir mocks de categoriesService
  {
    pattern:
      /listCategories: jest\.fn\(\(\) => Promise\.resolve\(\{ data: \[\] \}\)\)/g,
    replacement:
      'listCategories: jest.fn(() => Promise.resolve({ success: true, data: [] }))',
    files: ['**/*.test.ts', '**/*.test.tsx'],
  },
  // Corrigir mocks de commentsService
  {
    pattern: /getComments: jest\.fn\(\)/g,
    replacement: 'getCommentsByPost: jest.fn(() => Promise.resolve([]))',
    files: ['**/*.test.ts', '**/*.test.tsx'],
  },
];

async function fixFile(filePath) {
  try {
    let content = await readFile(filePath, 'utf-8');
    let modified = false;

    for (const fix of fixes) {
      // Verificar se o arquivo corresponde ao padrão
      const matchesPattern = fix.files.some(pattern => {
        const relativePath = filePath.replace(rootDir + '/', '');
        return relativePath.match(new RegExp(pattern.replace(/\*\*/g, '.*')));
      });

      if (!matchesPattern) continue;

      // Verificar condição se existir
      if (fix.condition && !fix.condition(content)) continue;

      // Aplicar correção
      if (fix.pattern.test(content)) {
        content = content.replace(fix.pattern, fix.replacement);
        modified = true;
      }
    }

    if (modified) {
      await writeFile(filePath, content, 'utf-8');
      console.log(`✅ Corrigido: ${filePath.replace(rootDir + '/', '')}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`❌ Erro ao processar ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔧 Corrigindo testes automaticamente...\n');

  const testFiles = await glob('tests/**/*.test.{ts,tsx}', {
    cwd: rootDir,
    absolute: true,
  });

  let fixed = 0;
  for (const file of testFiles) {
    if (await fixFile(file)) {
      fixed++;
    }
  }

  console.log(
    `\n✅ ${fixed} arquivo(s) corrigido(s) de ${testFiles.length} total`
  );
}

main().catch(console.error);
