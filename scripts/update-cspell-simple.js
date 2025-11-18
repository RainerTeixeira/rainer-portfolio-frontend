const fs = require('fs');
const path = require('path');

const words = new Set();

function findFiles(dir, extensions, fileList = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        if (!['node_modules', '.next', 'dist', 'coverage', '.git', 'test-results', '.vscode', '.idea'].includes(entry.name)) {
          findFiles(fullPath, extensions, fileList);
        }
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (extensions.includes(ext)) {
          fileList.push(fullPath);
        }
      }
    }
  } catch (e) {
    // Ignorar erros de acesso
  }
  
  return fileList;
}

console.log('Buscando arquivos...');
const rootDir = process.cwd();
const extensions = ['.ts', '.tsx', '.js', '.jsx', '.md'];
const files = findFiles(rootDir, extensions);
console.log(`Encontrados ${files.length} arquivos`);

let processed = 0;
for (const file of files) {
  try {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(/\b[a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ][a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ0-9_]{2,49}\b/g);
    if (matches) {
      matches.forEach(w => {
        if (w.length >= 3 && /[a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(w)) {
          words.add(w);
        }
      });
    }
    processed++;
    if (processed % 100 === 0) {
      process.stdout.write(`\rProcessados ${processed}/${files.length} arquivos...`);
    }
  } catch (e) {
    // Ignorar erros
  }
}

console.log(`\nExtraídas ${words.size} palavras únicas`);

// Ler dicionário atual
const cspellPath = path.join(process.cwd(), 'cspell.json');
const current = JSON.parse(fs.readFileSync(cspellPath, 'utf8'));
const currentWords = new Set(current.words.map(w => w.toLowerCase()));

// Filtrar palavras novas
const newWords = Array.from(words)
  .filter(w => {
    const lower = w.toLowerCase();
    return !currentWords.has(lower) && 
           /[a-záàâãéêíóôõúçA-ZÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(w) &&
           !/^[0-9]+$/.test(w) &&
           !w.startsWith('_') &&
           w.length >= 3 &&
           !w.includes('.') && // Não incluir palavras com pontos
           !w.includes('/') && // Não incluir caminhos
           !w.includes('\\'); // Não incluir caminhos Windows
  })
  .sort((a, b) => {
    const aIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(a);
    const bIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(b);
    if (aIsPt && !bIsPt) return -1;
    if (!aIsPt && bIsPt) return 1;
    return a.localeCompare(b);
  });

console.log(`\nEncontradas ${newWords.length} palavras novas`);

if (newWords.length > 0) {
  console.log('\nPrimeiras 50 palavras novas:');
  newWords.slice(0, 50).forEach((w, i) => {
    console.log(`  ${i + 1}. ${w}`);
  });
  
  // Atualizar dicionário
  const allWords = [...current.words, ...newWords].sort((a, b) => {
    const aIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(a);
    const bIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(b);
    if (aIsPt && !bIsPt) return -1;
    if (!aIsPt && bIsPt) return 1;
    return a.localeCompare(b);
  });
  
  current.words = allWords;
  fs.writeFileSync(cspellPath, JSON.stringify(current, null, 2) + '\n', 'utf8');
  
  console.log(`\n✅ cspell.json atualizado!`);
  console.log(`   - Palavras novas adicionadas: ${newWords.length}`);
  console.log(`   - Total de palavras no dicionário: ${allWords.length}`);
} else {
  console.log('\n✅ Nenhuma palavra nova encontrada. Dicionário já está atualizado!');
}

