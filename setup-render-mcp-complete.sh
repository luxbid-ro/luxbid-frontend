#!/bin/bash

echo "🚀 CONFIGURARE COMPLETĂ RENDER MCP PENTRU LUXBID"
echo "================================================"

# Verifică dacă configurația există
echo ""
echo "📋 PASUL 1: VERIFICARE CONFIGURAȚIE"
if [ -f ~/.cursor/mcp.json ]; then
    echo "✅ Configurația Cursor există: ~/.cursor/mcp.json"
    echo "📄 Conținut:"
    cat ~/.cursor/mcp.json
else
    echo "❌ Configurația Cursor nu există!"
    echo "Creez configurația..."
    mkdir -p ~/.cursor
    cat > ~/.cursor/mcp.json << EOF
{
  "mcpServers": {
    "render": {
      "url": "https://mcp.render.com/mcp",
      "headers": {
        "Authorization": "Bearer rnd_IzwDW73NYmtvBVJKPbeYBiasj2F0"
      }
    }
  }
}
EOF
    echo "✅ Configurația a fost creată!"
fi

echo ""
echo "📋 PASUL 2: VERIFICARE API KEY"
API_KEY="rnd_IzwDW73NYmtvBVJKPbeYBiasj2F0"
if [ -n "$API_KEY" ] && [ "$API_KEY" != "your-render-api-key-here" ]; then
    echo "✅ API Key este configurat: $API_KEY"
else
    echo "❌ API Key nu este configurat corect!"
    exit 1
fi

echo ""
echo "📋 PASUL 3: TESTARE CONEXIUNE RENDER"
echo "Testez conexiunea cu Render API..."

# Testează conexiunea cu Render API
RESPONSE=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services" 2>/dev/null)

if [ $? -eq 0 ] && [ -n "$RESPONSE" ]; then
    echo "✅ Conexiunea cu Render API funcționează!"
    echo "📊 Numărul de servicii găsite: $(echo "$RESPONSE" | grep -o '"id"' | wc -l)"
else
    echo "❌ Conexiunea cu Render API nu funcționează!"
    echo "Verifică API Key-ul și conexiunea la internet"
fi

echo ""
echo "📋 PASUL 4: CĂUTARE SERVICIU LUXBID"
echo "Caut serviciul LuxBid în lista de servicii..."

# Caută serviciul LuxBid
LUXBID_SERVICE=$(echo "$RESPONSE" | grep -i "luxbid" -A 5 -B 5)

if [ -n "$LUXBID_SERVICE" ]; then
    echo "✅ Serviciul LuxBid a fost găsit!"
    echo "📄 Detalii serviciu:"
    echo "$LUXBID_SERVICE" | head -10
else
    echo "⚠️ Serviciul LuxBid nu a fost găsit în lista de servicii"
    echo "Verifică numele serviciului pe Render Dashboard"
fi

echo ""
echo "📋 PASUL 5: CONFIGURARE WORKSPACE"
echo "Pentru a seta workspace-ul, scrie în Cursor:"
echo "'Set my Render workspace to [WORKSPACE_NAME]'"

echo ""
echo "📋 PASUL 6: COMENZI DE TESTAT"
echo "Testează aceste comenzi în Cursor:"
echo "1. 'List my Render services'"
echo "2. 'Show me the logs for luxbid-web'"
echo "3. 'Redeploy luxbid-web'"
echo "4. 'Show me the environment variables for luxbid-web'"

echo ""
echo "🎯 BENEFICII PENTRU LUXBID:"
echo "✅ Monitorizare deploy-uri în timp real"
echo "✅ Logs live pentru debugging"
echo "✅ Redeploy automat când e nevoie"
echo "✅ Health checks pentru site"
echo "✅ Gestionare environment variables"
echo "✅ Scale up/down resurse"
echo "✅ Gestionare domenii"

echo ""
echo "🎯 PENTRU PROBLEMA TA CU EMOJI-URI:"
echo "✅ 'Redeploy luxbid-web' - forțează redeploy instant"
echo "✅ 'Show me the logs for luxbid-web' - vezi de ce nu se actualizează"
echo "✅ 'Show me the environment variables for luxbid-web' - verifică config"

echo ""
echo "✅ CONFIGURAȚIA ESTE COMPLETĂ!"
echo "Restart Cursor și testează comenzile de mai sus!"
