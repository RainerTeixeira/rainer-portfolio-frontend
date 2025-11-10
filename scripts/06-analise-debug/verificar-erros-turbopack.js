/**
 * Script para verificar erros do Turbopack e console
 * Captura erros do F12 e logs do Turbopack
 */

const http = require('http');

console.log('🔍 Verificando erros do servidor e Turbopack...\n');

// Verificar se servidor está rodando
const checkServer = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:3000', res => {
      resolve(res.statusCode === 200 || res.statusCode === 404);
    });

    req.on('error', () => {
      reject(false);
    });

    req.setTimeout(3000, () => {
      req.destroy();
      reject(false);
    });
  });
};

async function verificarErros() {
  try {
    // Verificar servidor
    console.log('📡 Verificando servidor...');
    const serverOk = await checkServer().catch(() => false);

    if (!serverOk) {
      console.log('❌ Servidor não está rodando na porta 3000');
      console.log('🚀 Inicie o servidor com: npm run dev');
      return;
    }

    console.log('✅ Servidor está rodando\n');

    console.log('📋 ERROS COMUNS DO TURBOPACK:');
    console.log('   1. Verifique o terminal onde rodou "npm run dev"');
    console.log('   2. Procure por erros em vermelho');
    console.log('   3. Erros comuns:');
    console.log('      - Module not found');
    console.log('      - Import errors');
    console.log('      - Type errors');
    console.log('      - Syntax errors\n');

    console.log('📋 PARA VER ERROS NO NAVEGADOR:');
    console.log('   1. Abra: http://localhost:3000/dashboard');
    console.log('   2. Pressione F12');
    console.log('   3. Vá na aba "Console"');
    console.log('   4. Procure por:');
    console.log('      - Erros em vermelho (❌)');
    console.log('      - Warnings em amarelo (⚠️)');
    console.log('      - Erros do React (vermelho)');
    console.log('      - Erros do Next.js (vermelho)\n');

    console.log('📋 ERROS COMUNS A VERIFICAR:');
    console.log('   ❌ Hydration errors (React)');
    console.log('   ❌ Module not found');
    console.log('   ❌ Cannot read property');
    console.log('   ❌ Type errors');
    console.log('   ❌ Network errors (falhas de requisição)');
    console.log('   ❌ Syntax errors\n');

    // Criar script para ler erros do console
    console.log('💡 DICA: Copie os erros do console (F12) e me envie!\n');
  } catch (error) {
    console.error('❌ Erro ao verificar:', error.message);
  }
}

verificarErros();
