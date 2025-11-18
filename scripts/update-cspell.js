const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

async function extractWords() {
  const words = new Set();
  
  // Buscar arquivos
  const patterns = [
    '**/*.ts',
    '**/*.tsx',
    '**/*.js',
    '**/*.jsx',
    '**/*.md'
  ];
  
  const ignore = [
    '**/node_modules/**',
    '**/.next/**',
    '**/dist/**',
    '**/coverage/**',
    '**/test-results/**'
  ];
  
  const files = await glob(patterns, { ignore, cwd: process.cwd() });
  console.log(`Processando ${files.length} arquivos...`);
  
  // Extrair palavras
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
    } catch (e) {
      // Ignorar erros
    }
  }
  
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
             w.length >= 3;
    })
    .sort((a, b) => {
      const aIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(a);
      const bIsPt = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/.test(b);
      if (aIsPt && !bIsPt) return -1;
      if (!aIsPt && bIsPt) return 1;
      return a.localeCompare(b);
    });
  
  console.log(`\nEncontradas ${newWords.length} palavras novas`);
  
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
  
  console.log(`✅ cspell.json atualizado!`);
  console.log(`   - Palavras novas: ${newWords.length}`);
  console.log(`   - Total de palavras: ${allWords.length}`);
}

extractWords().catch(console.error);

