/**
 * Test Blog Data Retrieval
 * Tests if blog posts and categories are properly returned
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function testBlogData() {
  console.log(`🧪 Testing Blog Data: ${API_BASE}\n`);

  try {
    // Test posts endpoint
    console.log('📝 Testing Posts...');
    const postsResponse = await fetch(`${API_BASE}/api/v1/posts?limit=100&status=PUBLISHED`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Database-Provider': 'DYNAMODB'
      }
    });
    
    const postsData = await postsResponse.json();
    console.log(`Posts Response Status: ${postsResponse.status}`);
    console.log(`Posts Data:`, JSON.stringify(postsData, null, 2));
    
    if (postsData.success && postsData.data) {
      console.log(`✅ Found ${postsData.data.length} posts`);
      if (postsData.data.length > 0) {
        const firstPost = postsData.data[0];
        console.log(`First post: ${firstPost.title} (${firstPost.status})`);
      }
    } else {
      console.log('❌ No posts found or error in response');
    }

    // Test categories endpoint
    console.log('\n🏷️ Testing Categories...');
    const categoriesResponse = await fetch(`${API_BASE}/api/v1/categories`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Database-Provider': 'DYNAMODB'
      }
    });
    
    const categoriesData = await categoriesResponse.json();
    console.log(`Categories Response Status: ${categoriesResponse.status}`);
    console.log(`Categories Data:`, JSON.stringify(categoriesData, null, 2));
    
    if (categoriesData.success && categoriesData.data) {
      console.log(`✅ Found ${categoriesData.data.length} categories`);
      if (categoriesData.data.length > 0) {
        const firstCategory = categoriesData.data[0];
        console.log(`First category: ${firstCategory.name}`);
      }
    } else {
      console.log('❌ No categories found or error in response');
    }

    // Test health endpoint
    console.log('\n💚 Testing Health...');
    const healthResponse = await fetch(`${API_BASE}/api/v1/health/detailed`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Database-Provider': 'DYNAMODB'
      }
    });
    
    const healthData = await healthResponse.json();
    console.log(`Health Response Status: ${healthResponse.status}`);
    console.log(`Health Data:`, JSON.stringify(healthData, null, 2));

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testBlogData();