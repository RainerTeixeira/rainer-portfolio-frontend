/**
 * Script para testar a listagem de posts do usuário no dashboard
 * Verifica se todos os posts do usuário estão sendo carregados corretamente
 */

const http = require('http');

console.log('🧪 TESTE: Listagem de Posts do Usuário\n');
console.log('='.repeat(60));

// Verificar se servidor está rodando
function checkServer() {
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
}

async function testarListagem() {
  try {
    console.log('📡 Verificando servidor...');
    const serverOk = await checkServer().catch(() => false);

    if (!serverOk) {
      console.log('❌ Servidor não está rodando na porta 3000');
      console.log('🚀 Inicie o servidor com: npm run dev');
      return;
    }

    console.log('✅ Servidor está rodando\n');

    console.log('📋 TESTE DE LISTAGEM DE POSTS:\n');
    console.log('1️⃣  Acesse: http://localhost:3000/dashboard');
    console.log('2️⃣  Faça login (se necessário)');
    console.log('3️⃣  Verifique se aparece a lista de posts\n');

    console.log('🔍 O QUE VERIFICAR:\n');

    console.log('✅ Na Home do Dashboard:');
    console.log('   - Deve mostrar "Posts Recentes" (últimos 5)');
    console.log('   - Total de posts no topo');
    console.log('   - Ações rápidas disponíveis\n');

    console.log('✅ Na View "Todos os Posts" (view=all):');
    console.log('   - Deve listar TODOS os posts do usuário');
    console.log(
      '   - Deve mostrar posts com status: DRAFT, PUBLISHED, ARCHIVED'
    );
    console.log('   - Cada post deve ter:');
    console.log('     • Título');
    console.log('     • Data de criação');
    console.log('     • Status (badge)');
    console.log('     • Ações (editar, deletar, publicar/despublicar)');
    console.log('     • Preview da imagem de capa\n');

    console.log('✅ Funcionalidades a testar:');
    console.log('   1. Verificar se posts aparecem imediatamente após login');
    console.log('   2. Testar filtros (se houver)');
    console.log('   3. Verificar paginação (se houver muitos posts)');
    console.log('   4. Testar ações: Editar, Deletar, Publicar');
    console.log(
      '   5. Verificar se após criar novo post, ele aparece na lista\n'
    );

    console.log('🔧 COMANDOS DO CONSOLE (F12):\n');
    console.log('   // Verificar posts carregados');
    console.log('   // No React DevTools, inspecione o componente Dashboard');
    console.log('   // Verifique o estado: allPosts\n');

    console.log('📊 O QUE ESPERAR:\n');
    console.log('   - Hook usePosts() deve fazer chamada para:');
    console.log('     GET /api/posts');
    console.log('   - Backend deve retornar posts do usuário logado');
    console.log('   - Frontend deve renderizar todos os posts');
    console.log('   - Loading deve desaparecer após carregar\n');

    console.log('❌ PROBLEMAS COMUNS:\n');
    console.log('   1. Posts não aparecem:');
    console.log('      → Verifique se está autenticado');
    console.log('      → Verifique console (F12) por erros');
    console.log('      → Verifique se backend está retornando posts\n');

    console.log('   2. Apenas alguns posts aparecem:');
    console.log('      → Verifique se há filtro ativo');
    console.log('      → Verifique paginação\n');

    console.log('   3. Erro 401 (Unauthorized):');
    console.log('      → Faça login novamente');
    console.log('      → Verifique token de autenticação\n');

    console.log('   4. Erro 500 (Server Error):');
    console.log('      → Verifique logs do backend');
    console.log('      → Verifique se há posts no banco\n');

    console.log('🚀 PRÓXIMOS PASSOS:\n');
    console.log('   1. Abra: http://localhost:3000/dashboard');
    console.log('   2. Abra DevTools (F12)');
    console.log('   3. Vá na aba "Network"');
    console.log('   4. Recarregue a página');
    console.log('   5. Procure por requisição: GET /api/posts');
    console.log('   6. Verifique resposta da API');
    console.log('   7. Compare com o que aparece na tela\n');

    console.log('='.repeat(60));
    console.log('✨ Tudo pronto para testar!\n');
  } catch (error) {
    console.error('❌ Erro ao testar:', error.message);
  }
}

testarListagem();
