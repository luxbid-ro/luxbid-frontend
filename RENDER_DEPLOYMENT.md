# 🚀 Deployment pe Render.com pentru LuxBid Frontend

## Configurare Render.com

### 1. Creează un nou Web Service pe Render.com

- **Repository**: Conectează acest repository GitHub
- **Branch**: main/master  
- **Root Directory**: luxbid-web
- **Environment**: Node
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`

### 2. Environment Variables

Setează următoarele variabile de mediu în Render.com dashboard:

```
NEXT_PUBLIC_API_BASE_URL=https://luxbid-backend.onrender.com
NODE_ENV=production
PORT=3000
```

### 3. Build Settings

- **Node Version**: 20.12.0
- **Plan**: Free tier (pentru început)
- **Auto-Deploy**: Da (pentru branch-ul principal)

### 4. Health Check

- **Health Check Path**: `/`
- **Timeout**: 30 secunde

## Verificare Deployment

După deployment, verifică:

1. ✅ Site-ul se încarcă la URL-ul Render.com
2. ✅ Pagina principală funcționează
3. ✅ Pagina de oferte afișează mock data
4. ✅ Autentificarea funcționează
5. ✅ API-ul se conectează la backend

## Troubleshooting

### Build Fails
- Verifică că toate dependințele sunt în `package.json`
- Asigură-te că Node version este 20.12.0

### Runtime Errors
- Verifică variabilele de mediu sunt setate corect
- Verifică că backend-ul funcționează

### API Connection Issues
- Verifică că `NEXT_PUBLIC_API_BASE_URL` este setat corect
- Testează manual backend-ul: `curl https://luxbid-backend.onrender.com/health`

## Avantaje vs Vercel

✅ **Render.com**:
- Deploy-uri mai rapide și consistente
- Control mai bun asupra environment variables
- Logs mai clare și debugging mai ușor
- Free tier generos

❌ **Vercel Issues**:
- Deploy-uri lente și inconsistente
- Environment variables nu se propagă corect
- Cache-ul agresiv cauzează probleme cu modificările
