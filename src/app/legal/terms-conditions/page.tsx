import React from 'react'

export const metadata = {
  title: 'Termeni și Condiții - LuxBid',
  description: 'Termenii și condițiile de utilizare a platformei LuxBid. Regulile și obligațiile pentru utilizatori.',
}

export default function TermsConditionsPage() {
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
          Termeni și Condiții
        </h1>
        
        <div style={{ 
          color: '#333', 
          lineHeight: '1.7', 
          fontSize: '16px',
          marginBottom: '24px'
        }}>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Ultima actualizare:</strong> {new Date().toLocaleDateString('ro-RO')}
          </p>
          <p style={{ marginBottom: '16px', color: '#666' }}>
            <strong>Data intrării în vigoare:</strong> {new Date().toLocaleDateString('ro-RO')}
          </p>
        </div>

        <div style={{ color: '#333', lineHeight: '1.7', fontSize: '16px' }}>
          
          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            1. Acceptarea termenilor
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Prin accesarea și utilizarea platformei LuxBid ("Serviciul", "Platforma"), acceptați să respectați 
            acești Termeni și Condiții ("Termenii"). Dacă nu sunteți de acord cu acești termeni, 
            vă rugăm să nu utilizați serviciul nostru.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            2. Despre LuxBid
          </h2>
          <p style={{ marginBottom: '16px' }}>
            LuxBid este o platformă online care conectează cumpărătorii și vânzătorii de articole de lux 
            precum ceasuri, genți, bijuterii și alte obiecte de colecție. Facilităm comunicarea între utilizatori 
            și nu suntem responsabili pentru tranzacțiile desfășurate între aceștia.
          </p>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>Operator:</strong> LuxBid SRL</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Adresă:</strong> București, România</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email:</strong> contact@luxbid.ro</p>
            <p style={{ margin: 0 }}><strong>Telefon:</strong> +40 XXX XXX XXX</p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            3. Eligibilitate și înregistrare
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.1 Vârsta minimă
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Trebuie să aveți cel puțin 18 ani pentru a utiliza platforma noastră. Pentru utilizatorii cu vârsta 
            între 16-18 ani, este necesar consimțământul părinților sau tutorilor legali.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.2 Informații de înregistrare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            La înregistrare, vă angajați să furnizați informații adevărate, complete și actualizate. 
            Sunteți responsabili pentru confidențialitatea contului și parolei dvs.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            3.3 Un cont per utilizator
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Fiecare utilizator poate avea un singur cont. Crearea de conturi multiple este interzisă și 
            poate duce la suspendarea tuturor conturilor asociate.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            4. Utilizarea platformei
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4.1 Utilizare permisă
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Puteți utiliza platforma pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Listarea și vânzarea articolelor de lux autentice</li>
            <li>Căutarea și cumpărarea articolelor de lux</li>
            <li>Comunicarea cu alți utilizatori despre tranzacții</li>
            <li>Gestionarea profilului și preferințelor dvs.</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            4.2 Utilizare interzisă
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Este strict interzis să:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Listați produse contrafăcute, falsificate sau neautentice</li>
            <li>Încărcați conținut ilegal, obscen sau ofensator</li>
            <li>Hărțuiți, amenințați sau discriminați alți utilizatori</li>
            <li>Folosiți platforma pentru spam sau marketing nesolicitat</li>
            <li>Încercați să circumveniți sistemele de securitate</li>
            <li>Utilizați bot-uri sau automatizări neautorizate</li>
            <li>Colectați date ale altor utilizatori fără consimțământ</li>
            <li>Încălcați drepturile de proprietate intelectuală</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            5. Listinguri și conținut
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            5.1 Responsabilitatea pentru listinguri
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Sunteți complet responsabili pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Acuratețea descrierilor și imaginilor</li>
            <li>Autenticitatea articolelor listate</li>
            <li>Respectarea prețurilor și condițiilor specificate</li>
            <li>Disponibilitatea articolelor pentru vânzare</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            5.2 Moderarea conținutului
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Ne rezervăm dreptul de a modera, edita sau elimina orice conținut care:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Încalcă acești termeni</li>
            <li>Este raportat ca inadecvat de alți utilizatori</li>
            <li>Pare a fi fraudulos sau înșelător</li>
            <li>Încalcă legile aplicabile</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            5.3 Drepturile asupra conținutului
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Prin încărcarea conținutului pe platformă, ne acordați o licență non-exclusivă de a afișa, 
            stoca și procesa acest conținut în scopul furnizării serviciilor noastre.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            6. Tranzacții și plăți
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.1 Contracte între utilizatori
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Tranzacțiile se desfășoară direct între cumpărători și vânzători. LuxBid facilitează doar 
            comunicarea și nu este parte în aceste contracte.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.2 Comisioane și taxe
          </h3>
          <p style={{ marginBottom: '16px' }}>
            În viitor, putem implementa un sistem de comisioane pentru utilizarea platformei. 
            Orice modificări vor fi comunicate cu cel puțin 30 de zile în avans.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            6.3 Procesarea plăților
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Când va fi implementat, sistemul de plăți va fi gestionat de furnizori terți licențiați. 
            Ne vom conforma la toate reglementările PCI DSS și PSD2.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            7. Proprietate intelectuală
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            7.1 Proprietatea LuxBid
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Platforma, design-ul, logo-ul, și toate materialele originale sunt proprietatea LuxBid și 
            sunt protejate de drepturile de autor și mărcile comerciale.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            7.2 Respectarea drepturilor terților
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Respectați drepturile de proprietate intelectuală ale terților. Nu utilizați imagini, 
            texte sau mărci comerciale fără autorizație.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            7.3 Procedura DMCA
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Avem o procedură pentru tratarea reclamațiilor privind încălcarea drepturilor de autor. 
            Contactați-ne la dmca@luxbid.ro pentru raportarea încălcărilor.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            8. Limitări de responsabilitate
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            8.1 Serviciu "ca atare"
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Platforma este oferită "ca atare" fără garanții de niciun fel. Nu garantăm că serviciul 
            va fi neîntrerupt, fără erori sau complet securizat.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            8.2 Limitarea răspunderii
          </h3>
          <p style={{ marginBottom: '16px' }}>
            În măsura permisă de lege, răspunderea noastră este limitată la:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Furnizarea serviciului de platformă</li>
            <li>Facilitarea comunicării între utilizatori</li>
            <li>Respectarea obligațiilor de confidențialitate</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            8.3 Excluderi de răspundere
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Nu suntem responsabili pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Autenticitatea sau calitatea produselor</li>
            <li>Comportamentul altor utilizatori</li>
            <li>Pierderi financiare din tranzacții</li>
            <li>Interruperile temporare ale serviciului</li>
            <li>Acțiunile terților</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            9. Suspendarea și închiderea contului
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.1 Motive pentru suspendare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Putem suspenda sau închide contul dvs. pentru:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Încălcarea acestor termeni</li>
            <li>Activități frauduloase sau suspecte</li>
            <li>Rapoarte multiple de la alți utilizatori</li>
            <li>Nerespectarea legilor aplicabile</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            9.2 Procedura de contestare
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Aveți dreptul să contestați o suspendare contactându-ne la appeals@luxbid.ro în termen de 30 de zile.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            10. Soluționarea disputelor
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            10.1 Negociere directă
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Încurajăm rezolvarea disputelor prin comunicare directă între utilizatori.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            10.2 Medierea LuxBid
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Oferim servicii de mediere pentru disputele între utilizatori, fără costuri suplimentare.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            10.3 Legislația aplicabilă
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Acești termeni sunt guvernați de legislația română. Orice dispute vor fi rezolvate 
            de instanțele competente din București, România.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            11. Modificări ale termenilor
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Ne rezervăm dreptul de a modifica acești termeni. Modificările importante vor fi comunicate 
            prin email și prin notificare pe platformă cu cel puțin 30 de zile în avans.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            12. Dispoziții generale
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            12.1 Integritatea acordului
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Acești termeni, împreună cu Politica de Confidențialitate, constituie întregul acord între dvs. și LuxBid.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            12.2 Separabilitatea
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Dacă o prevedere devine nulă, restul termenilor rămân în vigoare.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', margin: '24px 0 12px 0', color: '#D09A1E' }}>
            12.3 Cesiunea
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Nu puteți transfera drepturile sau obligațiile din acești termeni fără acordul nostru scris.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '32px 0 16px 0', color: '#1a1a1a' }}>
            13. Contact
          </h2>
          <p style={{ marginBottom: '16px' }}>
            Pentru întrebări despre acești termeni, contactați-ne:
          </p>
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '32px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}><strong>Email:</strong> legal@luxbid.ro</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Telefon:</strong> +40 XXX XXX XXX</p>
            <p style={{ margin: '0 0 8px 0' }}><strong>Adresă:</strong> București, România</p>
            <p style={{ margin: 0 }}><strong>Program:</strong> Luni - Vineri, 09:00 - 17:00</p>
          </div>

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{ margin: 0, fontSize: '14px', color: '#856404' }}>
              <strong>Atenție:</strong> Prin continuarea utilizării platformei LuxBid, confirmați că ați citit, 
              înțeles și acceptat acești Termeni și Condiții în întregime.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
