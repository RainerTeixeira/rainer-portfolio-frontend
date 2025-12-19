/**
 * Teste rápido para verificar se o frontend consegue acessar dados do blog
 */

async function testFrontendBlogData() {
  console.log('🔍 Testando dados do blog para o frontend...\n');

  const baseUrl = 'http://localhost:4000/api/v1';

  // Testar posts publicados (o que o frontend precisa)
  try {
    const response = await fetch(`${baseUrl}/posts?status=PUBLISHED&limit=100`);
    const data = await response.json();
    
    console.log('📝 Posts publicados:');
    console.log('- Status:', response.status);
    console.log('- Estrutura:', typeof data);
    console.log('- Dados:', JSON.stringify(data, null, 2));
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('\n✅ BLOG FUNCIONANDO! Posts encontrados:', data.length);
      console.log('- Primeiro post:', data[0].title);
      console.log('- Slug:', data[0].slug);
      console.log('- Status:', data[0].status);
    } else if (data && data.data && Array.isArray(data.data)) {
      console.log('\n✅ BLOG FUNCIONANDO! Posts encontrados:', data.data.length);
      if (data.data.length > 0) {
        console.log('- Primeiro post:', data.data[0].title);
        console.log('- Slug:', data.data[0].slug);
        console.log('- Status:', data.data[0].status);
      }
    } else {
      console.log('\n❌ BLOG NÃO FUNCIONANDO - Nenhum post encontrado');
    }
    
  } catch (error) {
    console.log('❌ Erro ao buscar posts:', error.message);
  }

  // Testar categorias
  try {
    const response = await fetch(`${baseUrl}/categories`);
    const data = await response.json();
    
    console.log('\n🏷️ Categorias:');
    console.log('- Status:', response.status);
    
    if (Array.isArray(data) && data.length > 0) {
      console.log('✅ Categorias encontradas:', data.length);
    } else if (data && data.data && Array.isArray(data.data)) {
      console.log('✅ Categorias encontradas:', data.data.length);
    } else {
      console.log('❌ Nenhuma categoria encontrada');
    }
    
  } catch (error) {
    console.log('❌ Erro ao buscar categorias:', error.message);
  }
}

testFrontendBlogData();