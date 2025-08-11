// Simulez exact ce face frontend-ul deployed
const testFrontendFlow = async () => {
  console.log("🔍 Testing EXACT frontend flow...");
  
  // Testez cu environment variable din production
  const API_URL = "https://luxbid-backend.onrender.com";
  
  const formData = {
    email: "realtest@example.com",
    password: "TestPass123!",
    personType: "fizica",
    firstName: "Test",
    lastName: "User",
    phone: "0700000000",
    address: "Strada Test 123",
    city: "București",
    county: "București",
    postalCode: "010101",
    country: "România"
  };

  // Exact ca în frontend
  const registrationData = {
    ...formData,
    personType: formData.personType,
    name: formData.personType === 'fizica' ? `${formData.firstName} ${formData.lastName}` : formData.companyName
  };

  console.log("📤 Sending to:", API_URL + "/auth/register");
  console.log("📦 Data:", JSON.stringify(registrationData, null, 2));
  
  try {
    const res = await fetch(API_URL + "/auth/register", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'https://www.luxbid.ro'
      },
      body: JSON.stringify(registrationData),
    });

    console.log("📥 Response status:", res.status);
    
    if (res.ok) {
      const data = await res.json();
      console.log("✅ SUCCESS:", data);
    } else {
      const err = await res.json();
      console.log("❌ ERROR Response:", err);
      
      if (res.status === 400) {
        console.log("🔍 Validation error:", err.message);
      } else if (res.status === 500) {
        console.log("💥 Server error - backend issue");
      }
    }
  } catch (err) {
    console.error("🌐 Connection error:", err.message);
    console.log("This is what user sees: 'Eroare de conectare'");
  }
};

testFrontendFlow();
