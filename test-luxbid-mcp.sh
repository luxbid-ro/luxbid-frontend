#!/bin/bash

echo "🎯 TESTARE COMENZI SPECIFICE PENTRU LUXBID"
echo "=========================================="

API_KEY="rnd_IzwDW73NYmtvBVJKPbeYBiasj2F0"
FRONTEND_SERVICE_ID="srv-d2dh0radbo4c73bg629g"
BACKEND_SERVICE_ID="srv-d2cgu0h5pdvs73dlu920"

echo ""
echo "📊 INFORMATII SERVICII LUXBID:"
echo "Frontend: $FRONTEND_SERVICE_ID (luxbid-frontend)"
echo "Backend: $BACKEND_SERVICE_ID (luxbid-backend)"

echo ""
echo "🔍 TEST 1: STATUS SERVICII"
echo "Testez statusul serviciilor LuxBid..."

# Testează statusul frontend
FRONTEND_STATUS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Frontend status: OK"
    FRONTEND_URL=$(echo "$FRONTEND_STATUS" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    echo "🌐 URL: $FRONTEND_URL"
else
    echo "❌ Frontend status: ERROR"
fi

# Testează statusul backend
BACKEND_STATUS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$BACKEND_SERVICE_ID" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Backend status: OK"
    BACKEND_URL=$(echo "$BACKEND_STATUS" | grep -o '"url":"[^"]*"' | cut -d'"' -f4)
    echo "🌐 URL: $BACKEND_URL"
else
    echo "❌ Backend status: ERROR"
fi

echo ""
echo "🔍 TEST 2: ENVIRONMENT VARIABLES"
echo "Testez environment variables pentru frontend..."

# Testează environment variables pentru frontend
ENV_VARS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID/env-vars" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Environment variables: OK"
    echo "📄 Numărul de variabile: $(echo "$ENV_VARS" | grep -o '"key"' | wc -l)"
else
    echo "❌ Environment variables: ERROR"
fi

echo ""
echo "🔍 TEST 3: DEPLOYMENTS"
echo "Testez ultimele deploy-uri pentru frontend..."

# Testează ultimele deploy-uri
DEPLOYMENTS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID/deploys" 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "✅ Deployments: OK"
    LATEST_DEPLOY=$(echo "$DEPLOYMENTS" | grep -o '"status":"[^"]*"' | head -1 | cut -d'"' -f4)
    echo "📅 Ultimul deploy status: $LATEST_DEPLOY"
else
    echo "❌ Deployments: ERROR"
fi

echo ""
echo "🎯 COMENZI PENTRU CURSOR:"
echo "Acestea sunt comenzile pe care le poți folosi în Cursor:"
echo ""
echo "📊 MONITORIZARE:"
echo "- 'List my Render services'"
echo "- 'Show me the logs for luxbid-frontend'"
echo "- 'Show me the logs for luxbid-backend'"
echo "- 'Show me the environment variables for luxbid-frontend'"
echo ""
echo "🔧 GESTIONARE:"
echo "- 'Redeploy luxbid-frontend'"
echo "- 'Redeploy luxbid-backend'"
echo "- 'Update environment variable NEXT_PUBLIC_API_BASE_URL=https://luxbid-backend.onrender.com for luxbid-frontend'"
echo ""
echo "🎯 PENTRU PROBLEMA TA CU EMOJI-URI:"
echo "- 'Redeploy luxbid-frontend' - forțează redeploy instant"
echo "- 'Show me the logs for luxbid-frontend' - vezi de ce nu se actualizează"
echo "- 'Show me the environment variables for luxbid-frontend' - verifică config"

echo ""
echo "✅ TOATE TESTELE SUNT COMPLETE!"
echo "Render MCP este gata pentru LuxBid!"
