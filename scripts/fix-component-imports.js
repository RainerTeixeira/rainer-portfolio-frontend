#!/usr/bin/env node

/**
 * Script para corrigir imports de componentes após reorganização
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const FRONTEND_DIR = path.dirname(__dirname);

// Mapeamentos específicos que precisam de correção manual
const MANUAL_FIXES = {
  // Componentes imports
  'from "@/components/home/': 'from "@/components/domain/home/',
  'from "@/components/sobre/': 'from "@/components/domain/sobre/',
  'from "@/components/contato/': 'from "@/components/domain/contato/',
  'from "@/components/blog/': 'from "@/components/domain/blog/',
  'from "@/components/dashboard/': 'from "@/components/domain/dashboard/',
  
  // Imports relativos
  "from '../home/": "from '../domain/home/",
  "from '../sobre/": "from '../domain/sobre/",
  "from '../contato/": "from '../domain/contato/",
  "from '../blog/": "from '../domain/blog/",
  "from '../dashboard/": "from '../domain/dashboard/",
  
  // Lib utils que não existem em @rainersoft/utils
  "from '@rainersoft/utils'": "from '@/lib/utils'", // Temporário
};

/**
 * Verifica se um arquivo de utilitário existe em @rainersoft/utils
 */
function checkUtilExists(utilName, utilsDir) {
  const utilPath = path.join(utilsDir, `${utilName}.ts`);
  return fs.existsSync(utilPath);
}

/**
 * Lista todos os exports disponíveis em @rainersoft/utils
 */
function getAvailableUtils() {
  const utilsDir = path.join(FRONTEND_DIR, '../rainer-utils/src');
  const available = {};
  
  if (fs.existsSync(utilsDir)) {
    const indexFile = path.join(utilsDir, 'index.ts');
    if (fs.existsSync(indexFile)) {
      const content = fs.readFileSync(indexFile, 'utf8');
      // Extrai exports do index
      const exports = content.match(/export\s+(?:const|function)\s+(\w+)/g);
      if (exports) {
        exports.forEach(exp => {
          const name = exp.match(/export\s+(?:const|function)\s+(\w+)/)[1];
          available[name] = true;
        });
      }
    }
  }
  
  return available;
}

/**
 * Corrige imports em um arquivo
 */
function fixImportsInFile(filePath, availableUtils) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Aplica correções manuais
    Object.entries(MANUAL_FIXES).forEach(([oldImport, newImport]) => {
      const regex = new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.match(regex)) {
        content = content.replace(regex, newImport);
        updated = true;
        console.log(`  ✅ ${path.basename(filePath)}: ${oldImport} → ${newImport}`);
      }
    });
    
    // Verifica imports de @rainersoft/utils que não existem
    const utilsImports = content.match(/import\s*{([^}]+)}\s*from\s*['"]@rainersoft\/utils['"]/g);
    if (utilsImports) {
      utilsImports.forEach(importLine => {
        const match = importLine.match(/import\s*{([^}]+)}\s*from\s*['"]@rainersoft\/utils['"]/);
        if (match) {
          const imports = match[1].split(',').map(s => s.trim());
          const missingImports = imports.filter(imp => !availableUtils[imp]);
          
          if (missingImports.length > 0) {
            // Substitui para usar lib/utils local
            const newImport = importLine.replace('@rainersoft/utils', '@/lib/utils');
            content = content.replace(importLine, newImport);
            updated = true;
            console.log(`  ⚠️  ${path.basename(filePath)}: Utils não encontrados, usando lib/utils local`);
          }
        }
      });
    }
    
    // Salva se atualizado
    if (updated) {
      fs.writeFileSync(filePath, content);
      return true;
    }
    
    return false;
  } catch (error) {
    console.log(`❌ Erro ao processar ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Corrigindo imports de componentes e utils...\n');
  
  // Verifica utils disponíveis
  const availableUtils = getAvailableUtils();
  console.log(`📦 Utils disponíveis em @rainersoft/utils: ${Object.keys(availableUtils).length}`);
  
  // Encontra arquivos para corrigir
  const files = glob.sync('**/*.{ts,tsx}', {
    cwd: FRONTEND_DIR,
    ignore: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
      'scripts/**',
      'constants/**' // Já corrigido
    ]
  });
  
  console.log(`\n📁 Processando ${files.length} arquivos...\n`);
  
  let updatedCount = 0;
  
  files.forEach(file => {
    const filePath = path.join(FRONTEND_DIR, file);
    if (fixImportsInFile(filePath, availableUtils)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✅ Concluído! ${updatedCount} arquivos atualizados.`);
  
  console.log('\n📝 Próximos passos:');
  console.log('1. Execute: pnpm run type-check');
  console.log('2. Corrija erros restantes manualmente');
  console.log('3. Execute: pnpm run build');
}

// Executar script
if (require.main === module) {
  main();
}

module.exports = { main, fixImportsInFile };
