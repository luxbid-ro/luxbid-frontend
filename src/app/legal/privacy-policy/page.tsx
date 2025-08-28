import React from 'react'

export const metadata = {
  title: 'Politica de Confidențialitate - LuxBid',
  description: 'Politica de confidențialitate LuxBid. Informații despre colectarea, prelucrarea și protecția datelor personale conform GDPR.',
}

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: 'calc(100vh - 60px)', padding: '40px 0', background: '#fff' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ 
          fontSize: '36px', 
          fontWeight: '700', 
          marginBottom: '32px',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Politica de Confidențialitate
        </h1>
        
        <div style={{ 
          color: '#333', 
          lineHeight: '1.7', 
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Ultima actualizare:</strong> 28.08.2025
          </p>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Data intrării în vigoare:</strong> 28.08.2025
          </p>
        </div>

        <div style={{ color: '#333', lineHeight: '1.7', fontSize: '16px' }}>
          
          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            1. Introducere
          </h2>
          <p style={{ marginBottom: '16px' }}>
            LuxBid ("noi", "platforma noastră") respectă confidențialitatea datelor personale și se angajează să 
            protejeze informațiile pe care ni le oferiți. Această politică explică cum colectăm, folosim, 
            stocăm și protejăm datele dvs. personale conform Regulamentului General privind Protecția Datelor (GDPR).
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            2. Operatorul de date
          </h2>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>Denumire:</strong> LuxBid SRL</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Adresă:</strong> București, România</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email:</strong> contact@luxbid.ro</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>DPO Email:</strong> dpo@luxbid.ro</p>
            <p style={{ margin: 0 }}><strong>Telefon:</strong> +40 XXX XXX XXX</p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            3. Ce date personale colectăm
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.1 Date de înregistrare și profil
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Nume și prenume</li>
            <li>Adresă de email</li>
            <li>Număr de telefon</li>
            <li>Adresă de facturare</li>
            <li>CNP (pentru persoane fizice) sau CUI (pentru persoane juridice)</li>
            <li>Parolă (criptată)</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.2 Date despre activitatea pe platformă
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Listingurile create și imaginile încărcate</li>
            <li>Ofertele făcute și primite</li>
            <li>Mesajele și comunicările</li>
            <li>Istoricul căutărilor și navigației</li>
            <li>Preferințele și setările contului</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.3 Date tehnice și de utilizare
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Adresa IP și locația aproximativă</li>
            <li>Tipul și versiunea browser-ului</li>
            <li>Sistemul de operare</li>
            <li>Timestampurile accesărilor</li>
            <li>Paginile vizitate și acțiunile efectuate</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            4. Cum folosim datele dvs.
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4.1 Pentru furnizarea serviciilor
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Crearea și gestionarea contului dvs.</li>
            <li>Procesarea și afișarea listingurilor</li>
            <li>Facilitarea comunicării între utilizatori</li>
            <li>Procesarea ofertelor și tranzacțiilor</li>
            <li>Furnizarea suportului pentru clienți</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4.2 Pentru securitate și prevenirea fraudei
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Verificarea identității utilizatorilor</li>
            <li>Detectarea și prevenirea activităților frauduloase</li>
            <li>Monitorizarea abuzurilor și încălcărilor termenilor</li>
            <li>Asigurarea securității platformei</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4.3 Pentru îmbunătățiri și analiză
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Analiza utilizării platformei</li>
            <li>Îmbunătățirea funcționalităților existente</li>
            <li>Dezvoltarea de noi caracteristici</li>
            <li>Optimizarea performanței site-ului</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            5. Baza legală pentru prelucrare
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Prelucrăm datele dvs. pe următoarele baze legale:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Contractul:</strong> Pentru furnizarea serviciilor solicitate</li>
            <li><strong>Interesul legitim:</strong> Pentru securitate, prevenirea fraudei și îmbunătățiri</li>
            <li><strong>Consimțământul:</strong> Pentru marketing și comunicări opționale</li>
            <li><strong>Obligația legală:</strong> Pentru respectarea legislației aplicabile</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            6. Cu cine partajăm datele
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.1 Cu alți utilizatori
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Anumite informații sunt vizibile public sau partajate cu alți utilizatori:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Numele de afișare în listinguri</li>
            <li>Informațiile din listingurile publice</li>
            <li>Mesajele trimise prin chat</li>
            <li>Evaluările și review-urile</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.2 Cu furnizorii de servicii
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Hosting:</strong> Render.com pentru găzduirea aplicației</li>
            <li><strong>Email:</strong> Google Workspace pentru trimiterea emailurilor</li>
            <li><strong>Imagini:</strong> Cloudinary pentru stocarea și optimizarea imaginilor</li>
            <li><strong>Plăți:</strong> Stripe pentru procesarea plăților (când va fi implementat)</li>
            <li><strong>Analiză:</strong> Google Analytics pentru înțelegerea utilizării</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.3 În circumstanțe legale
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Putem dezvălui datele când este necesar legal:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Pentru respectarea unei obligații legale</li>
            <li>La cererea autorităților competente</li>
            <li>Pentru protejarea drepturilor noastre legale</li>
            <li>În caz de investigații de securitate</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            7. Transferuri internaționale de date
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Unii dintre furnizorii noștri de servicii pot fi localizați în afara Spațiului Economic European (SEE). 
            Când transferăm date în afara SEE, ne asigurăm că există garanții adecvate prin:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Decizii de adecvare ale Comisiei Europene</li>
            <li>Clauze contractuale standard</li>
            <li>Certificări și coduri de conduită aprobate</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            8. Cât timp păstrăm datele
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Păstrăm datele doar cât este necesar pentru îndeplinirea scopurilor pentru care au fost colectate:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Conturi active:</strong> Pe durata utilizării serviciului</li>
            <li><strong>Conturi șterse:</strong> 30 de zile pentru recuperare, apoi ștergere completă</li>
            <li><strong>Date de tranzacții:</strong> 7 ani pentru conformitate fiscală</li>
            <li><strong>Log-uri de securitate:</strong> 12 luni</li>
            <li><strong>Date de marketing:</strong> 3 ani sau până la retragerea consimțământului</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            9. Drepturile dvs. GDPR
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Aveți următoarele drepturi privind datele personale:
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.1 Dreptul de acces
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți solicita o copie a datelor personale pe care le deținem despre dvs.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.2 Dreptul de rectificare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți cere corectarea datelor inexacte sau completarea celor incomplete.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.3 Dreptul la ștergere ("dreptul de a fi uitat")
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți cere ștergerea datelor în anumite circumstanțe.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.4 Dreptul la portabilitatea datelor
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți cere transferul datelor către alt furnizor de servicii.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.5 Dreptul la opoziție
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți vă opune prelucrării bazate pe interesul legitim.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.6 Dreptul la restricționarea prelucrării
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți cere limitarea prelucrării în anumite situații.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            10. Securitatea datelor
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Implementăm măsuri tehnice și organizatorice pentru protejarea datelor:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Criptarea datelor în tranzit și în repaus</li>
            <li>Autentificare securizată cu token-uri JWT</li>
            <li>Hashing-ul parolelor cu bcrypt</li>
            <li>Monitoring-ul activităților suspecte</li>
            <li>Backup-uri regulate și securizate</li>
            <li>Accesul restricționat bazat pe roluri</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            11. Încălcări de securitate
          </h2>
          <p style={{ marginBottom: '16px' }}>
            În cazul unei încălcări de securitate care prezintă un risc pentru drepturile dvs., 
            vom notifica autoritatea de supraveghere în termen de 72 de ore și pe dvs. fără întârziere nejustificată.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            12. Modificări ale politicii
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Putem actualiza această politică periodic. Modificările importante vor fi comunicate prin email 
            și prin afișare pe site. Vă recomandăm să revedeți această politică regulat.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            13. Contact și reclamații
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Pentru exercitarea drepturilor sau pentru întrebări despre această politică:
          </p>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email DPO:</strong> dpo@luxbid.ro</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email general:</strong> contact@luxbid.ro</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Telefon:</strong> +40 XXX XXX XXX</p>
            <p style={{ margin: 0 }}><strong>Adresă:</strong> București, România</p>
          </div>

          <p style={{ marginBottom: '16px' }}>
            De asemenea, aveți dreptul să depuneți o plângere la autoritatea de supraveghere:
          </p>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>ANSPDCP (Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal)</strong></p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Site:</strong> dataprotection.ro</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email:</strong> anspdcp@dataprotection.ro</p>
            <p style={{ margin: 0 }}><strong>Telefon:</strong> +40 21 252 5599</p>
          </div>
        </div>
      </div>
    </div>
  )
}
