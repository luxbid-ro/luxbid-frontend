// Test fără câmpul name
const testWithoutName = async () => {
  const formData = {
    email: "finaltestno" + Date.now() + "@example.com",
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

  // Exact ca în frontend-ul fix-uit
  const registrationData = {
    ...formData,
    personType: formData.personType
  };

  console.log("📤 Testing WITHOUT name field...");
  console.log("📦 Data:", JSON.stringify(registrationData, null, 2));
  
  try {
    const res = await fetch("https://luxbid-backend.onrender.com/auth/register", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Origin': 'https://www.luxbid.ro'
      },
      body: JSON.stringify(registrationData),
    });

    console.log("📥 Response status:", res.status);
    
    const responseData = await res.json();
    console.log("📄 Response:", responseData);
    
    if (res.status === 201 || res.status === 200) {
      console.log("🎉 SUCCESS! Registration working!");
    } else if (res.status === 400) {
      console.log("❌ Still validation error:", responseData.message);
    } else if (res.status === 500) {
      console.log("⚠️ Server error but validation passed");
    }
    
  } catch (err) {
    console.error("💥 Error:", err.message);
  }
};

testWithoutName();
