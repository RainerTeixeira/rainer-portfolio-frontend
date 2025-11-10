/**
 * Script para abrir Chrome e verificar erros na UI
 * Execute: node tests/scripts/testar-ui-chrome.js
 */

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🌐 Abrindo Chrome para testar UI...\n');

// Caminhos possíveis do Chrome no Windows
const chromePaths = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  path.join(
    process.env.LOCALAPPDATA || '',
    'Google\\Chrome\\Application\\chrome.exe'
  ),
];

let chromeFound = false;
let chromePath = null;

for (const chrome of chromePaths) {
  if (fs.existsSync(chrome)) {
    chromePath = chrome;
    chromeFound = true;
    break;
  }
}

if (!chromeFound) {
  console.log('❌ Chrome não encontrado nos caminhos padrão');
  console.log('📝 Abrindo navegador padrão...');
  exec('start http://localhost:3000/dashboard');
  process.exit(0);
}

// Criar diretório de resultados se não existir
const resultsDir = path.join(__dirname, '..', '..', 'test-results');
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Abrir Chrome com DevTools
const url = 'http://localhost:3000/dashboard';
const chromeArgs = [
  url,
  '--auto-open-devtools-for-tabs', // Abre DevTools automaticamente
  '--new-window',
];

console.log('🚀 Abrindo Chrome com DevTools...');
console.log(`📝 URL: ${url}`);
console.log('\n📋 INSTRUÇÕES:');
console.log('   1. O Chrome abrirá com DevTools aberto');
console.log('   2. Vá na aba "Console"');
console.log('   3. Verifique erros em vermelho');
console.log('   4. Teste o upload de imagem:');
console.log('      - Clique em "Novo Post"');
console.log('      - Clique em "Upload" e selecione imagem');
console.log('      - Verifique se preview aparece APENAS no lado direito');
console.log('   5. Clique em "Salvar" e observe o upload');
console.log('\n✅ Chrome será aberto agora...\n');

exec(`"${chromePath}" ${chromeArgs.join(' ')}`, error => {
  if (error) {
    console.error('❌ Erro ao abrir Chrome:', error.message);
    console.log(
      '\n📝 Tente abrir manualmente: http://localhost:3000/dashboard'
    );
  } else {
    console.log('✅ Chrome aberto com sucesso!');
  }
});
