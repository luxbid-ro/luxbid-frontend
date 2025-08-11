// Test complet frontend → backend
const testRegistration = async () => {
  const API_URL = "https://luxbid-backend.onrender.com";
  
  const registrationData = {
    email: "testfrontend" + Date.now() + "@example.com",
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

  console.log("1. Testing frontend → backend connection...");
  console.log("API URL:", API_URL);
  console.log("Data to send:", JSON.stringify(registrationData, null, 2));
  
  try {
    const response = await fetch(API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Origin": "https://www.luxbid.ro"
      },
      body: JSON.stringify(registrationData)
    });
    
    console.log("2. Response status:", response.status);
    console.log("3. Response headers:", Object.fromEntries(response.headers.entries()));
    
    const responseText = await response.text();
    console.log("4. Response body:", responseText);
    
    if (response.status === 400) {
      console.log("❌ VALIDATION ERROR - Check field validation");
    } else if (response.status === 500) {
      console.log("⚠️ SERVER ERROR - Validation passed but server issue");
    } else if (response.status === 201 || response.status === 200) {
      console.log("✅ SUCCESS - Registration worked!");
    } else {
      console.log("❓ UNKNOWN STATUS:", response.status);
    }
    
  } catch (error) {
    console.error("💥 CONNECTION ERROR:", error.message);
  }
};

testRegistration();
