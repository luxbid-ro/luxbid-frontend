#!/bin/bash

echo "🧪 TESTARE RENDER MCP PENTRU LUXBID"
echo "==================================="

# Verifică dacă configurația există
if [ ! -f "render-mcp-config.json" ]; then
    echo "❌ Configurația nu există!"
    echo "Rulează: ./setup-render-mcp.sh"
    exit 1
fi

echo "✅ Configurația există"
echo "📄 Conținut:"
cat render-mcp-config.json

echo ""
echo "🔍 VERIFICARE API KEY:"
if grep -q "your-render-api-key-here" render-mcp-config.json; then
    echo "❌ API Key nu este configurat!"
    echo "Editează render-mcp-config.json și adaugă API Key-ul tău"
else
    echo "✅ API Key pare să fie configurat"
fi

echo ""
echo "🔍 VERIFICARE SERVICE ID:"
if grep -q "your-service-id-here" render-mcp-config.json; then
    echo "❌ Service ID nu este configurat!"
    echo "Editează render-mcp-config.json și adaugă Service ID-ul"
else
    echo "✅ Service ID pare să fie configurat"
fi

echo ""
echo "🚀 TESTARE CONEXIUNE RENDER:"
echo "Dacă totul e configurat corect, rulează:"
echo "npx mcp-render list-services"
