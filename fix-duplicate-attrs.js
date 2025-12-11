// Script para corrigir atributos duplicados sem criar novos
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

// Padrões para remover duplicatas
const duplicatePatterns = [
  // Remove variant duplicado
  {
    pattern: /<Button([^>]*?)\s+variant="[^"]*"([^>]*?)\s+variant="([^"]*)"/g,
    replacement: '<Button$1 variant="$3"$2'
  },
  // Remove size duplicado
  {
    pattern: /<Button([^>]*?)\s+size="[^"]*"([^>]*?)\s+size="([^"]*)"/g,
    replacement: '<Button$1 size="$3"$2'
  },
  // Remove type duplicado em Input
  {
    pattern: /<Input([^>]*?)\s+type="[^"]*"([^>]*?)\s+type="([^"]*)"/g,
    replacement: '<Input$1 type="$3"$2'
  },
  // Remove variant duplicado em Badge
  {
    pattern: /<Badge([^>]*?)\s+variant="[^"]*"([^>]*?)\s+variant="([^"]*)"/g,
    replacement: '<Badge$1 variant="$3"$2'
  }
];

const files = findFiles('./app', ['.tsx', '.ts']);

console.log('Corrigindo atributos duplicados...');

let totalCorrections = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileCorrections = 0;
  
  for (const pattern of duplicatePatterns) {
    const before = content;
    content = content.replace(pattern.pattern, pattern.replacement);
    if (before !== content) {
      const matches = before.match(pattern.pattern);
      if (matches) {
        fileCorrections += matches.length;
        console.log(`\nArquivo: ${file}`);
        console.log(`Correções: ${matches.length}`);
      }
    }
  }
  
  if (fileCorrections > 0) {
    fs.writeFileSync(file, content);
    totalCorrections += fileCorrections;
  }
}

console.log(`\nTotal de correções: ${totalCorrections}`);
console.log('Concluído!');
