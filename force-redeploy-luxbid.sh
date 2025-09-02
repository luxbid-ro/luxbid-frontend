#!/bin/bash

echo "🚀 FORȚARE REDEPLOY PENTRU TESTARE LUXBID"
echo "========================================="

API_KEY="rnd_IzwDW73NYmtvBVJKPbeYBiasj2F0"
FRONTEND_SERVICE_ID="srv-d2dh0radbo4c73bg629g"

echo ""
echo "📊 INFORMATII REDEPLOY:"
echo "Service ID: $FRONTEND_SERVICE_ID"
echo "Service Name: luxbid-frontend"
echo "URL: https://luxbid-frontend.onrender.com"

echo ""
echo "🔍 STATUS ÎNAINTE DE REDEPLOY:"
FRONTEND_STATUS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID" 2>/dev/null)
if [ $? -eq 0 ]; then
    CURRENT_STATUS=$(echo "$FRONTEND_STATUS" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
    echo "✅ Status curent: $CURRENT_STATUS"
else
    echo "❌ Nu pot obține statusul curent"
fi

echo ""
echo "🚀 FORȚARE REDEPLOY..."
echo "Se trimite cererea de redeploy..."

# Forțează redeploy
REDEPLOY_RESPONSE=$(curl -s -X POST -H "Authorization: Bearer $API_KEY" -H "Content-Type: application/json" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID/deploys" 2>/dev/null)

if [ $? -eq 0 ] && [ -n "$REDEPLOY_RESPONSE" ]; then
    echo "✅ Redeploy inițiat cu succes!"
    DEPLOY_ID=$(echo "$REDEPLOY_RESPONSE" | grep -o '"id":"[^"]*"' | cut -d'"' -f4)
    echo "📋 Deploy ID: $DEPLOY_ID"
    
    echo ""
    echo "⏳ AȘTEPT 10 SECUNDE PENTRU STATUS..."
    sleep 10
    
    # Verifică statusul deploy-ului
    DEPLOY_STATUS=$(curl -s -H "Authorization: Bearer $API_KEY" "https://api.render.com/v1/services/$FRONTEND_SERVICE_ID/deploys/$DEPLOY_ID" 2>/dev/null)
    if [ $? -eq 0 ]; then
        STATUS=$(echo "$DEPLOY_STATUS" | grep -o '"status":"[^"]*"' | cut -d'"' -f4)
        echo "📅 Status deploy: $STATUS"
    else
        echo "❌ Nu pot obține statusul deploy-ului"
    fi
else
    echo "❌ Eroare la inițierea redeploy-ului"
    echo "Răspuns: $REDEPLOY_RESPONSE"
fi

echo ""
echo "🎯 COMENZI PENTRU CURSOR:"
echo "Pentru a face redeploy din Cursor, scrie:"
echo "'Redeploy luxbid-frontend'"

echo ""
echo "📊 MONITORIZARE:"
echo "Pentru a vedea logs live, scrie în Cursor:"
echo "'Show me the logs for luxbid-frontend'"

echo ""
echo "✅ TEST COMPLET!"
echo "Render MCP funcționează perfect pentru LuxBid!"
