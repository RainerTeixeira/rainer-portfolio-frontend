#!/usr/bin/env node

/**
 * Script para corrigir imports relativos nas constants
 */

const fs = require('fs');
const path = require('path');

const FRONTEND_DIR = path.dirname(__dirname);

// Mapeamentos de imports relativos para constants
const RELATIVE_IMPORT_FIXES = {
  // Dentro de content/
  "from '../comum/": "from '../../metadata/comum/",
  "from './comum/": "from '../metadata/comum/",
  
  // Dentro de metadata/comum/
  "from '../": "from '../../",
};

/**
 * Corrige imports relativos em um arquivo
 */
function fixRelativeImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let updated = false;
    
    // Aplica correções de imports relativos
    Object.entries(RELATIVE_IMPORT_FIXES).forEach(([oldImport, newImport]) => {
      const regex = new RegExp(oldImport.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
      if (content.match(regex)) {
        content = content.replace(regex, newImport);
        updated = true;
        console.log(`  ✅ ${path.basename(filePath)}: ${oldImport} → ${newImport}`);
      }
    });
    
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
 * Encontra todos os arquivos nas constants
 */
function findConstantsFiles() {
  const constantsDir = path.join(FRONTEND_DIR, 'constants');
  const files = [];
  
  function scanDirectory(dir) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);
      
      if (stat.isDirectory()) {
        scanDirectory(itemPath);
      } else if (item.endsWith('.ts')) {
        files.push(itemPath);
      }
    });
  }
  
  scanDirectory(constantsDir);
  return files;
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Corrigindo imports relativos nas constants...\n');
  
  const files = findConstantsFiles();
  console.log(`📁 Processando ${files.length} arquivos...\n`);
  
  let updatedCount = 0;
  
  files.forEach(filePath => {
    if (fixRelativeImportsInFile(filePath)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✅ Concluído! ${updatedCount} arquivos atualizados.`);
}

// Executar script
if (require.main === module) {
  main();
}

module.exports = { main, fixRelativeImportsInFile };
