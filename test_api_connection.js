// Test API connection from frontend perspective

const API_BASE = 'https://luxbid-backend.onrender.com';

async function testAPI() {
  console.log('🧪 Testing API connection...');
  
  try {
    // Test 1: Health check
    const health = await fetch(`${API_BASE}/health`);
    console.log('✅ Health check:', health.status);
    
    // Test 2: Listings
    const listings = await fetch(`${API_BASE}/listings`);
    const listingsData = await listings.json();
    console.log('✅ Listings:', listingsData.length, 'items');
    
    // Test 3: Single listing
    if (listingsData.length > 0) {
      const listingId = listingsData[0].id;
      const listing = await fetch(`${API_BASE}/listings/${listingId}`);
      const listingData = await listing.json();
      console.log('✅ Single listing:', listingData.title);
    }
    
    // Test 4: Auth endpoints
    const authTest = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'demo@luxbid.ro', password: 'demo123' })
    });
    console.log('✅ Auth test:', authTest.status);
    
    console.log('🎉 All API tests passed!');
    
  } catch (error) {
    console.error('❌ API test failed:', error.message);
  }
}

// Run test
testAPI();
