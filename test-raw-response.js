/**
 * Test Raw Response Format
 * Check the exact response format from backend
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

async function testRawResponse() {
  console.log('🧪 Testing Raw Response Format...\n');

  try {
    const response = await fetch(`${API_BASE}/api/v1/posts?limit=5`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Database-Provider': 'DYNAMODB'
      }
    });
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', Object.fromEntries(response.headers.entries()));
    
    const text = await response.text();
    console.log('Raw Response Text:', text);
    
    try {
      const json = JSON.parse(text);
      console.log('Parsed JSON:', JSON.stringify(json, null, 2));
    } catch (e) {
      console.log('Failed to parse as JSON');
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testRawResponse();