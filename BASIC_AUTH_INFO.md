# 🔐 LuxBid Basic Authentication

## 📋 Credențiale de Acces

**Site-ul este protejat cu Basic Authentication pentru a restricționa accesul doar la echipa de dezvoltare.**

### 🔑 Credențiale Curente:
- **Username**: `luxbid`
- **Password**: `luxbid2024`

### 🌐 Cum să Accesezi Site-ul:

1. **Deschide** https://luxbid.ro în browser
2. **Va apărea un popup** cu "Authentication required"
3. **Introdu credențialele** de mai sus
4. **Click "OK"** și vei avea acces complet

### 🔄 Schimbarea Credențialelor:

Pentru a schimba username/password-ul:

1. **Actualizează** `render.yaml`:
   ```yaml
   - key: BASIC_AUTH_USER
     value: "nou_username"
   - key: BASIC_AUTH_PASSWORD
     value: "noua_parola"
   ```

2. **Commit și push** modificările
3. **Render va redeploya** automat cu noile credențiale

### 👥 Partajarea Accesului:

**Pentru partenerul tău:**
- Trimite-i credențialele: `luxbid` / `luxbid2024`
- Nu e nevoie de cont sau înregistrare
- Funcționează pe orice browser/device

### 🛡️ Securitate:

- **Toate paginile** sunt protejate
- **API routes** rămân publice pentru funcționalitate
- **Static files** (imagini, CSS) nu sunt restricționate
- **Logout**: Închide browser-ul sau folosește "Private/Incognito" mode

### ⚡ Dezactivarea Temporară:

Pentru a dezactiva Basic Auth:
1. **Șterge sau redenumește** `middleware.ts`
2. **Commit și push**
3. Site-ul va fi din nou public

---

**💡 Tip**: Salvează credențialele în browser pentru acces rapid!
