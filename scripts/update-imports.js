#!/usr/bin/env node

/**
 * Script para atualizar imports após reorganização
 */

const fs = require('fs');
const path = require('path');
const glob = require('glob');

const FRONTEND_DIR = path.dirname(__dirname);

// Mapeamento de imports antigos para novos
const IMPORT_MAPPINGS = {
  // Constants
  'constants/home/': 'constants/content/home/',
  'constants/sobre/': 'constants/content/sobre/',
  'constants/contato/': 'constants/content/contato/',
  'constants/blog/': 'constants/content/blog/',
  'constants/comum/': 'constants/metadata/comum/',
  
  // Components
  'components/home/': 'components/domain/home/',
  'components/sobre/': 'components/domain/sobre/',
  'components/contato/': 'components/domain/contato/',
  'components/blog/': 'components/domain/blog/',
  'components/dashboard/': 'components/domain/dashboard/',
};

/**
 * Atualiza imports em um arquivo
 */
function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Para cada mapeamento, substitui no conteúdo
    Object.entries(IMPORT_MAPPINGS).forEach(([oldPath, newPath]) => {
      const regex = new RegExp(oldPath.replace('/', '\\/'), 'g');
      if (content.match(regex)) {
        content = content.replace(regex, newPath);
        updated = true;
        console.log(`  ✅ Atualizado: ${oldPath} → ${newPath}`);
      }
    });
    
    // Salva o arquivo se foi atualizado
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
 * Encontra todos os arquivos TypeScript/TSX
 */
function findTypeScriptFiles() {
  const pattern = '**/*.{ts,tsx}';
  const files = glob.sync(pattern, {
    cwd: FRONTEND_DIR,
    ignore: [
      'node_modules/**',
      '.next/**',
      'dist/**',
      'out/**',
      'scripts/**'
    ]
  });
  
  return files.map(file => path.join(FRONTEND_DIR, file));
}

/**
 * Main execution
 */
function main() {
  console.log('🔄 Atualizando imports após reorganização...\n');
  
  const files = findTypeScriptFiles();
  console.log(`📁 Encontrados ${files.length} arquivos TypeScript/TSX\n`);
  
  let updatedCount = 0;
  
  files.forEach(filePath => {
    if (updateImportsInFile(filePath)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✅ Concluído! ${updatedCount} arquivos atualizados.`);
  
  if (updatedCount > 0) {
    console.log('\n📝 Verificação recomendada:');
    console.log('1. Execute: pnpm run type-check');
    console.log('2. Execute: pnpm run build');
    console.log('3. Teste a aplicação');
  }
}

// Executar script
if (require.main === module) {
  main();
}

module.exports = { main, updateImportsInFile };
