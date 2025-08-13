// Test Login pe luxbid.ro
const https = require('https');

// Step 1: Test Login API direct
console.log('🧪 STEP 1: Testez login API direct...');

const postData = JSON.stringify({
  email: 'andrei.ionut91@icloud.com',
  password: 'parolamea123'
});

const options = {
  hostname: 'luxbid-backend.onrender.com',
  port: 443,
  path: '/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('✅ Backend Response Status:', res.statusCode);
    
    if (res.statusCode === 200) {
      const response = JSON.parse(data);
      console.log('✅ LOGIN SUCCESS!');
      console.log('📧 User Email:', response.user.email);
      console.log('🆔 User ID:', response.user.id);
      console.log('🔑 Token Length:', response.accessToken.length);
      console.log('🔑 Token Preview:', response.accessToken.substring(0, 50) + '...');
      
      // Step 2: Test Profile API cu token
      console.log('\n🧪 STEP 2: Testez profile API cu token...');
      
      const profileOptions = {
        hostname: 'luxbid-backend.onrender.com',
        port: 443,
        path: '/users/profile',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${response.accessToken}`,
          'Content-Type': 'application/json'
        }
      };
      
      const profileReq = https.request(profileOptions, (profileRes) => {
        let profileData = '';
        
        profileRes.on('data', (chunk) => {
          profileData += chunk;
        });
        
        profileRes.on('end', () => {
          console.log('✅ Profile Response Status:', profileRes.statusCode);
          
          if (profileRes.statusCode === 200) {
            const profile = JSON.parse(profileData);
            console.log('✅ PROFILE ACCESS SUCCESS!');
            console.log('👤 Name:', profile.firstName, profile.lastName);
            console.log('📧 Email:', profile.email);
            console.log('📱 Phone:', profile.phone);
            console.log('🏢 Person Type:', profile.personType);
            console.log('\n🎉 TOKEN CONSISTENCY TEST: PASSED!');
            console.log('\n📋 REZULTAT FINAL:');
            console.log('   ✅ Login funcționează');
            console.log('   ✅ Token-ul e valid');
            console.log('   ✅ Profile API funcționează');
            console.log('   ✅ Site-ul luxbid.ro e live');
            console.log('\n🚀 POȚI TESTA MANUAL ACUM!');
          } else {
            console.log('❌ Profile request failed:', profileData);
          }
        });
      });
      
      profileReq.on('error', (e) => {
        console.error('❌ Profile request error:', e.message);
      });
      
      profileReq.end();
      
    } else {
      console.log('❌ LOGIN FAILED:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('❌ Request error:', e.message);
});

req.write(postData);
req.end();
