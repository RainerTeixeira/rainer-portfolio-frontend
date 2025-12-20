/**
 * Test Backend Public Routes
 * Tests all public routes that the frontend uses
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function testRoute(endpoint, method = 'GET', body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'X-Database-Provider': 'DYNAMODB'
      }
    };
    
    if (body) {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_BASE}/api/v1${endpoint}`, options);
    const data = await response.json();
    
    console.log(`✅ ${method} ${endpoint}: ${response.status}`);
    if (!response.ok) {
      console.error(`❌ Error:`, data);
    }
    return { success: response.ok, data, status: response.status };
  } catch (error) {
    console.error(`❌ ${method} ${endpoint}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runTests() {
  console.log(`🧪 Testing Backend Routes: ${API_BASE}\n`);

  // Health Check
  await testRoute('/health');
  await testRoute('/health/detailed');

  // Public Blog Routes
  await testRoute('/posts');
  await testRoute('/posts?status=PUBLISHED&limit=5');
  await testRoute('/categories');
  await testRoute('/categories?parentId=null');

  // Test specific endpoints that might exist
  const postsResult = await testRoute('/posts');
  if (postsResult.success && postsResult.data?.data?.length > 0) {
    const firstPost = postsResult.data.data[0];
    await testRoute(`/posts/${firstPost.id}`);
    if (firstPost.slug) {
      await testRoute(`/posts/slug/${firstPost.slug}`);
    }
  }

  const categoriesResult = await testRoute('/categories');
  if (categoriesResult.success && categoriesResult.data?.data?.length > 0) {
    const firstCategory = categoriesResult.data.data[0];
    await testRoute(`/categories/${firstCategory.id}`);
    if (firstCategory.slug) {
      await testRoute(`/categories/slug/${firstCategory.slug}`);
    }
  }

  console.log('\n🏁 Test completed');
}

runTests().catch(console.error);