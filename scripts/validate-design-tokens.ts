#!/usr/bin/env ts-node
/**
 * Script de Validação de Design Tokens
 * 
 * Valida que nenhum valor hardcoded (cores, spacing, etc.) está sendo usado
 * no código, exceto em arquivos permitidos (como not-found.tsx).
 * 
 * Uso: tsx scripts/validate-design-tokens.ts
 * Exit code: 0 = sucesso, 1 = falha (valores hardcoded encontrados)
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

// Arquivos/pastas permitidos (easter eggs, animações específicas)
const ALLOWED_FILES = [
  'app/not-found.tsx',
  'tests/',
  '.next/',
  'node_modules/',
  'scripts/',
  'docs/',
];

// Padrões de valores hardcoded
const PATTERNS = {
  colors: {
    regex: /(rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+|\#[0-9a-fA-F]{3,6}|hsl\s*\(\s*\d+)/g,
    message: 'Cor hardcoded encontrada',
  },
  spacing: {
    regex: /['"](\d+(?:\.\d+)?px)['"](?![^<]*>)/g,
    message: 'Spacing hardcoded encontrado',
  },
  fontSize: {
    regex: /fontSize:\s*['"](\d+(?:\.\d+)?(?:px|rem))['"]|text-\[\d+px\]/g,
    message: 'Font size hardcoded encontrado',
  },
  borderRadius: {
    regex: /borderRadius:\s*['"](\d+(?:\.\d+)?px)['"]|rounded-\[\d+px\]/g,
    message: 'Border radius hardcoded encontrado',
  },
};

interface Issue {
  file: string;
  line: number;
  column: number;
  type: string;
  message: string;
  value: string;
}

const issues: Issue[] = [];

function isAllowedFile(filePath: string): boolean {
  return ALLOWED_FILES.some(allowed => filePath.includes(allowed));
}

function scanFile(filePath: string): void {
  if (isAllowedFile(filePath)) return;

  try {
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');

    Object.entries(PATTERNS).forEach(([type, pattern]) => {
      lines.forEach((line, lineIndex) => {
        let match;
        while ((match = pattern.regex.exec(line)) !== null) {
          // Skip se estiver em comentário
          const beforeMatch = line.substring(0, match.index);
          if (beforeMatch.includes('//') || beforeMatch.includes('/*')) continue;

          // Skip se for import ou var(--
          if (line.includes('import') || line.includes('var(--')) continue;

          issues.push({
            file: filePath.replace(process.cwd() + '\\', ''),
            line: lineIndex + 1,
            column: match.index,
            type,
            message: pattern.message,
            value: match[0],
          });
        }
      });
    });
  } catch (error) {
    console.error(`Erro ao ler ${filePath}:`, error);
  }
}

function scanDirectory(dir: string): void {
  try {
    const files = readdirSync(dir);

    files.forEach(file => {
      const fullPath = join(dir, file);
      const stat = statSync(fullPath);

      if (isAllowedFile(fullPath)) return;

      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        if (!file.endsWith('.d.ts') && !file.includes('.test.') && !file.includes('.spec.')) {
          scanFile(fullPath);
        }
      }
    });
  } catch (error) {
    // Ignora erros de diretórios não acessíveis
  }
}

// Main execution
console.log('🔍 Validando uso de Design Tokens...\n');

const targetDirs = ['app', 'components', 'lib', 'hooks'];
targetDirs.forEach(dir => {
  const fullPath = join(process.cwd(), dir);
  try {
    scanDirectory(fullPath);
  } catch (error) {
    console.warn(`⚠️  Diretório ${dir} não encontrado, ignorando...`);
  }
});

// Report
if (issues.length === 0) {
  console.log('✅ Nenhum valor hardcoded encontrado!');
  console.log('✅ Todos os estilos usam Design Tokens corretamente.\n');
  process.exit(0);
} else {
  console.error(`❌ ${issues.length} valores hardcoded encontrados:\n`);

  // Agrupar por tipo
  const byType = issues.reduce((acc, issue) => {
    if (!acc[issue.type]) acc[issue.type] = [];
    acc[issue.type].push(issue);
    return acc;
  }, {} as Record<string, Issue[]>);

  Object.entries(byType).forEach(([type, typeIssues]) => {
    console.error(`\n${type.toUpperCase()} (${typeIssues.length}):`);
    typeIssues.slice(0, 10).forEach(issue => {
      console.error(`  ${issue.file}:${issue.line}:${issue.column}`);
      console.error(`    ${issue.message}: ${issue.value}`);
    });
    if (typeIssues.length > 10) {
      console.error(`  ... e mais ${typeIssues.length - 10} ocorrências`);
    }
  });

  console.error('\n❌ Use design tokens da biblioteca @rainer/design-tokens');
  console.error('   Exemplo: var(--color-primary) ou classes Tailwind baseadas em tokens\n');
  process.exit(1);
}

