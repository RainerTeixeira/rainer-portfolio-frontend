/**
 * Script para corrigir erros do Turbopack com framer-motion
 *
 * Este script limpa o cache do Next.js e verifica a instalação do framer-motion
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('\n🔧 CORRIGINDO ERRO DO TURBOPACK COM FRAMER-MOTION\n');
console.log('═══════════════════════════════════════════════════════\n');

// 1. Limpar cache do Next.js
console.log('📝 Passo 1: Limpando cache do Next.js...');
const nextCachePath = path.join(process.cwd(), '.next');
if (fs.existsSync(nextCachePath)) {
  fs.rmSync(nextCachePath, { recursive: true, force: true });
  console.log('✅ Cache .next removido\n');
} else {
  console.log('⚠️  Pasta .next não encontrada\n');
}

// 2. Limpar cache do node_modules
console.log('📝 Passo 2: Limpando cache do node_modules...');
const nodeModulesCachePath = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(nodeModulesCachePath)) {
  fs.rmSync(nodeModulesCachePath, { recursive: true, force: true });
  console.log('✅ Cache node_modules/.cache removido\n');
} else {
  console.log('⚠️  Cache node_modules/.cache não encontrado\n');
}

// 3. Verificar instalação do framer-motion
console.log('📝 Passo 3: Verificando instalação do framer-motion...');
try {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
  const packageJson = JSON.parse(packageJsonContent);
  const hasFramerMotion =
    (packageJson.dependencies && packageJson.dependencies['framer-motion']) ||
    (packageJson.devDependencies &&
      packageJson.devDependencies['framer-motion']);

  if (hasFramerMotion) {
    console.log(
      `✅ framer-motion está instalado (versão: ${hasFramerMotion})\n`
    );
  } else {
    console.log('❌ framer-motion NÃO está instalado\n');
    console.log('💡 Execute: npm install framer-motion\n');
  }
} catch (error) {
  console.log('⚠️  Erro ao verificar package.json:', error.message, '\n');
}

console.log('═══════════════════════════════════════════════════════\n');
console.log('✅ Limpeza concluída!\n');
console.log('📝 Próximos passos:');
console.log('   1. Pare o servidor de desenvolvimento (Ctrl+C)');
console.log('   2. Execute: npm run dev');
console.log('   3. O erro deve ser resolvido\n');
console.log('💡 Se o erro persistir:');
console.log(
  '   - Tente desabilitar o Turbopack: npm run dev -- --no-turbopack'
);
console.log('   - Ou atualize o Next.js: npm install next@latest\n');
