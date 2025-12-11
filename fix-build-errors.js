// Script para corrigir erros de build em massa
const fs = require('fs');
const path = require('path');

// Padrões de correção
const corrections = [
  // Button sem variant/size
  {
    pattern: /<Button\s+(?!.*variant=)(?!.*size=)([^>]*?)>/g,
    replacement: '<Button variant="default" size="lg" $1>'
  },
  // Button sem size (mas tem variant)
  {
    pattern: /<Button\s+(?!.*size=)([^>]*variant="[^"]*"[^>]*?)>/g,
    replacement: '<Button size="lg" $1>'
  },
  // Badge sem variant
  {
    pattern: /<Badge\s+(?!.*variant=)([^>]*?)>/g,
    replacement: '<Badge variant="secondary" $1>'
  },
  // Input sem type
  {
    pattern: /<Input\s+(?!.*type=)([^>]*?)>/g,
    replacement: '<Input type="text" $1>'
  }
];

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

console.log('Corrigindo erros de build...');

let totalCorrections = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let fileCorrections = 0;
  
  for (const correction of corrections) {
    const matches = content.match(correction.pattern);
    if (matches) {
      content = content.replace(correction.pattern, correction.replacement);
      fileCorrections += matches.length;
      console.log(`\nArquivo: ${file}`);
      console.log(`Correções: ${matches.length}`);
      matches.slice(0, 3).forEach(match => console.log(`  - ${match.substring(0, 80)}...`));
    }
  }
  
  if (fileCorrections > 0) {
    fs.writeFileSync(file, content);
    totalCorrections += fileCorrections;
  }
}

console.log(`\nTotal de correções: ${totalCorrections}`);
console.log('Concluído!');
