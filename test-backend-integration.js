/**
 * Script para testar integração frontend-backend
 * Testa todas as rotas principais e verifica se os dados estão sendo retornados
 */

const API_BASE = 'http://localhost:4000/api/v1';

async function testEndpoint(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}${endpoint}`, options);
    const data = await response.json();
    
    return {
      success: response.ok,
      status: response.status,
      data: data,
      endpoint
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
      endpoint
    };
  }
}

async function testAllEndpoints() {
  console.log('🔍 Testando integração Frontend-Backend...\n');

  const tests = [
    // Health Check
    { endpoint: '/health', name: 'Health Check' },
    { endpoint: '/health/detailed', name: 'Health Detailed' },
    
    // Users
    { endpoint: '/users', name: 'Lista Usuários' },
    
    // Categories
    { endpoint: '/categories', name: 'Lista Categorias' },
    
    // Posts
    { endpoint: '/posts', name: 'Lista Posts' },
    { endpoint: '/posts?status=PUBLISHED', name: 'Posts Publicados' },
    { endpoint: '/posts?limit=5', name: 'Posts com Limite' },
    
    // Comments
    { endpoint: '/comments', name: 'Lista Comentários' },
    
    // Likes
    { endpoint: '/likes', name: 'Lista Likes' },
    
    // Bookmarks
    { endpoint: '/bookmarks', name: 'Lista Bookmarks' },
    
    // Notifications
    { endpoint: '/notifications', name: 'Lista Notificações' },
  ];

  const results = [];
  
  for (const test of tests) {
    console.log(`Testando: ${test.name}...`);
    const result = await testEndpoint(test.endpoint);
    results.push({ ...result, name: test.name });
    
    if (result.success) {
      console.log(`✅ ${test.name}: OK (${result.status})`);
      if (result.data && typeof result.data === 'object') {
        if (Array.isArray(result.data)) {
          console.log(`   📊 Retornou ${result.data.length} itens`);
        } else if (result.data.data && Array.isArray(result.data.data)) {
          console.log(`   📊 Retornou ${result.data.data.length} itens`);
        } else if (result.data.success !== undefined) {
          console.log(`   📊 Success: ${result.data.success}`);
        }
      }
    } else {
      console.log(`❌ ${test.name}: ERRO (${result.status || 'N/A'})`);
      if (result.error) {
        console.log(`   🚨 Erro: ${result.error}`);
      }
    }
    console.log('');
  }

  // Resumo
  const successful = results.filter(r => r.success).length;
  const total = results.length;
  
  console.log('📋 RESUMO DOS TESTES:');
  console.log(`✅ Sucessos: ${successful}/${total}`);
  console.log(`❌ Falhas: ${total - successful}/${total}`);
  
  if (successful === total) {
    console.log('\n🎉 TODOS OS TESTES PASSARAM! Backend está funcionando corretamente.');
  } else {
    console.log('\n⚠️  Alguns testes falharam. Verifique o backend.');
  }

  return results;
}

// Testar dados específicos do blog
async function testBlogData() {
  console.log('\n🔍 Testando dados específicos do blog...\n');

  // Testar posts publicados
  const postsResult = await testEndpoint('/posts?status=PUBLISHED&limit=100');
  if (postsResult.success) {
    const posts = postsResult.data?.data || postsResult.data || [];
    console.log(`📝 Posts publicados encontrados: ${posts.length}`);
    
    if (posts.length > 0) {
      const firstPost = posts[0];
      console.log('📄 Estrutura do primeiro post:');
      console.log('   - ID:', !!firstPost.id);
      console.log('   - Título:', !!firstPost.title);
      console.log('   - Slug:', !!firstPost.slug);
      console.log('   - Conteúdo:', !!firstPost.content);
      console.log('   - Autor ID:', !!firstPost.authorId);
      console.log('   - Subcategoria ID:', !!firstPost.subcategoryId);
      console.log('   - Status:', firstPost.status);
      console.log('   - Views:', firstPost.views || 0);
      console.log('   - Likes:', firstPost.likesCount || 0);
      console.log('   - Comentários:', firstPost.commentsCount || 0);
    }
  }

  // Testar categorias
  const categoriesResult = await testEndpoint('/categories');
  if (categoriesResult.success) {
    const categories = categoriesResult.data?.data || categoriesResult.data || [];
    console.log(`\n🏷️  Categorias encontradas: ${categories.length}`);
    
    if (categories.length > 0) {
      const firstCategory = categories[0];
      console.log('📂 Estrutura da primeira categoria:');
      console.log('   - ID:', !!firstCategory.id);
      console.log('   - Nome:', !!firstCategory.name);
      console.log('   - Slug:', !!firstCategory.slug);
      console.log('   - Cor:', !!firstCategory.color);
      console.log('   - Ícone:', !!firstCategory.icon);
      console.log('   - Parent ID:', !!firstCategory.parentId);
      console.log('   - Posts Count:', firstCategory.postsCount || 0);
    }
  }

  // Testar usuários
  const usersResult = await testEndpoint('/users');
  if (usersResult.success) {
    const users = usersResult.data?.data || usersResult.data || [];
    console.log(`\n👥 Usuários encontrados: ${users.length}`);
    
    if (users.length > 0) {
      const firstUser = users[0];
      console.log('👤 Estrutura do primeiro usuário:');
      console.log('   - Cognito Sub:', !!firstUser.cognitoSub);
      console.log('   - Nome completo:', !!firstUser.fullName);
      console.log('   - Nickname:', !!firstUser.nickname);
      console.log('   - Role:', firstUser.role);
      console.log('   - Ativo:', firstUser.isActive);
      console.log('   - Posts Count:', firstUser.postsCount || 0);
    }
  }
}

async function main() {
  try {
    await testAllEndpoints();
    await testBlogData();
  } catch (error) {
    console.error('❌ Erro durante os testes:', error);
  }
}

main();