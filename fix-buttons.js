// Script para encontrar e corrigir todos os Buttons sem variant e size
const fs = require('fs');
const path = require('path');

function findFiles(dir, extensions) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      files = files.concat(findFiles(fullPath, extensions));
    } else if (extensions.some(ext => item.endsWith(ext))) {
      files.push(fullPath);
    }
  }
  
  return files;
}

const files = findFiles('./app', ['.tsx', '.ts']);

console.log('Procurando por Buttons sem variant/size...');

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  
  // Procura por componentes Button sem variant ou size
  const buttonMatches = content.match(/<Button[^>]*>/g);
  
  if (buttonMatches) {
    for (const match of buttonMatches) {
      if (!match.includes('variant=') || !match.includes('size=')) {
        console.log(`\nArquivo: ${file}`);
        console.log(`Button encontrado: ${match}`);
      }
    }
  }
}

console.log('\nConcluído!');
