#!/bin/bash

# LuxBid - Script de testare riguroasă post-deploy
# Testează toate funcționalitățile critice după deploy

BASE_URL="https://luxbid-frontend.onrender.com"
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 TESTARE RIGUROASĂ LUXBID - Funcționalități Critice"
echo "=================================================="

# Test 1: FAQ Mobile Layout
echo -e "\n${YELLOW}Test 1: FAQ Mobile Layout Fix${NC}"
FAQ_GRID=$(curl -s "$BASE_URL/faq" | grep -c "grid-template-columns.*minmax")
if [ $FAQ_GRID -gt 0 ]; then
    echo -e "${GREEN}✅ FAQ Grid Layout implementat${NC}"
else
    echo -e "${RED}❌ FAQ Grid Layout încă folosește flexbox${NC}"
fi

# Test 2: NavBar Duplication Fix
echo -e "\n${YELLOW}Test 2: NavBar Duplication Fix${NC}"
NAVBAR_HOME=$(curl -s "$BASE_URL/" | grep -c "class=\"nav\"")
NAVBAR_OFFERS=$(curl -s "$BASE_URL/oferte" | grep -c "class=\"nav\"")
NAVBAR_FAQ=$(curl -s "$BASE_URL/faq" | grep -c "class=\"nav\"")

echo "Homepage NavBars: $NAVBAR_HOME (should be 1)"
echo "Oferte NavBars: $NAVBAR_OFFERS (should be 1)"
echo "FAQ NavBars: $NAVBAR_FAQ (should be 1)"

if [ $NAVBAR_HOME -eq 1 ] && [ $NAVBAR_OFFERS -eq 1 ] && [ $NAVBAR_FAQ -eq 1 ]; then
    echo -e "${GREEN}✅ NavBar duplication fix COMPLET${NC}"
else
    echo -e "${RED}❌ NavBar duplication încă există${NC}"
fi

# Test 3: Notification Bell Z-Index & Welcome Message
echo -e "\n${YELLOW}Test 3: Notification Bell Fixes${NC}"
ZINDEX_FIX=$(curl -s "$BASE_URL/" | grep -c "zIndex.*10001")
WELCOME_PERSISTENT=$(curl -s "$BASE_URL/" | grep -c "luxbid_welcome_read")

if [ $ZINDEX_FIX -gt 0 ]; then
    echo -e "${GREEN}✅ Z-index 10001 implementat${NC}"
else
    echo -e "${RED}❌ Z-index fix lipsește${NC}"
fi

if [ $WELCOME_PERSISTENT -gt 0 ]; then
    echo -e "${GREEN}✅ Welcome message persistent în localStorage${NC}"
else
    echo -e "${RED}❌ Welcome message localStorage lipsește${NC}"
fi

# Test 4: API Backend Connectivity
echo -e "\n${YELLOW}Test 4: Backend API Connectivity${NC}"
BACKEND_LISTINGS=$(curl -s "https://luxbid-backend.onrender.com/listings" | jq length 2>/dev/null || echo "0")
if [ $BACKEND_LISTINGS -gt 0 ]; then
    echo -e "${GREEN}✅ Backend returnează $BACKEND_LISTINGS listings${NC}"
else
    echo -e "${RED}❌ Backend API nu returnează date${NC}"
fi

# Test 5: Favorites Functionality
echo -e "\n${YELLOW}Test 5: Favorites Page${NC}"
FAVORITES_PAGE=$(curl -s "$BASE_URL/favorites" | grep -c "Anunțurile mele favorite")
if [ $FAVORITES_PAGE -gt 0 ]; then
    echo -e "${GREEN}✅ Favorites page funcțională${NC}"
else
    echo -e "${RED}❌ Favorites page probleme${NC}"
fi

# Test 6: Performance Check
echo -e "\n${YELLOW}Test 6: Performance Response Times${NC}"
HOME_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$BASE_URL/")
OFFERS_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$BASE_URL/oferte")
FAQ_TIME=$(curl -w "%{time_total}" -o /dev/null -s "$BASE_URL/faq")

echo "Homepage: ${HOME_TIME}s"
echo "Oferte: ${OFFERS_TIME}s"
echo "FAQ: ${FAQ_TIME}s"

# Summary
echo -e "\n${YELLOW}📊 REZUMAT TESTARE${NC}"
echo "=================================================="
echo "Testele au fost executate pentru toate fix-urile implementate"
echo "Rezultatele de mai sus indică statusul actual al deploy-ului"
echo ""
echo "🎯 Pentru rezultate complete, rulează din nou după finalizarea deploy-ului"
