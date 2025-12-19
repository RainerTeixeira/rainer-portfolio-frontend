/**
 * Teste simples para verificar se o blog está funcionando
 */

async function testBlogEndpoints() {
  const baseUrl = 'http://localhost:4000/api/v1';
  
  console.log('🔍 Testando endpoints do blog...\n');

  // Test posts
  try {
    const postsResponse = await fetch(`${baseUrl}/posts`);
    const postsData = await postsResponse.json();
    console.log('📝 Posts endpoint:', postsResponse.status);
    console.log('📝 Posts data:', JSON.stringify(postsData, null, 2));
  } catch (error) {
    console.log('❌ Posts error:', error.message);
  }

  // Test categories
  try {
    const categoriesResponse = await fetch(`${baseUrl}/categories`);
    const categoriesData = await categoriesResponse.json();
    console.log('\n🏷️ Categories endpoint:', categoriesResponse.status);
    console.log('🏷️ Categories data:', JSON.stringify(categoriesData, null, 2));
  } catch (error) {
    console.log('❌ Categories error:', error.message);
  }

  // Test users
  try {
    const usersResponse = await fetch(`${baseUrl}/users`);
    const usersData = await usersResponse.json();
    console.log('\n👥 Users endpoint:', usersResponse.status);
    console.log('👥 Users data:', JSON.stringify(usersData, null, 2));
  } catch (error) {
    console.log('❌ Users error:', error.message);
  }
}

testBlogEndpoints();