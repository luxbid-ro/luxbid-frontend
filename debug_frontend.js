// Simulez exact ce face frontend-ul
const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

console.log("Frontend încearcă să se conecteze la:", API_URL);

// Test conexiune
fetch(API_URL + '/health')
  .then(response => {
    console.log("Health check status:", response.status);
    return response.text();
  })
  .then(data => {
    console.log("Health response:", data);
  })
  .catch(error => {
    console.error("EROARE DE CONECTARE:", error.message);
  });
