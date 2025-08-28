import React from 'react'

export default function DisclaimerPage() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 60px)',
      padding: '40px 0',
      background: '#fff'
    }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          marginBottom: '32px',
          color: '#1a1a1a',
          textAlign: 'center'
        }}>
          Avertismente Legale și Disclaimer
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

        <div style={{
          background: '#fef2f2',
          border: '2px solid #dc2626',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '32px'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0 0 16px 0',
            color: '#dc2626'
          }}>
            ⚠️ AVERTISMENT IMPORTANT
          </h2>
          <p style={{ margin: '0', fontSize: '16px', color: '#7f1d1d' }}>
            LuxBid este o platformă de intermediere între cumpărători și vânzători. 
            NU garantăm autenticitatea, calitatea sau legalitatea obiectelor listate. 
            Utilizatorii sunt responsabili pentru propria diligență și verificări.
          </p>
        </div>

        <div style={{
          color: '#333',
          lineHeight: '1.7',
          fontSize: '16px'
        }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            1. Natura serviciilor LuxBid
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.1 Platformă de intermediere
          </h3>
          <p style={{ marginBottom: '16px' }}>
            LuxBid funcționează exclusiv ca o platformă de intermediere care conectează 
            cumpărători și vânzători de obiecte de lux. Nu suntem:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Proprietarii obiectelor listate</li>
            <li>Agenți de vânzare sau cumpărare</li>
            <li>Evaluatori sau experți în autenticitate</li>
            <li>Serviciu de escrow sau custodie</li>
            <li>Asigurători pentru tranzacții</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            1.2 Rolul nostru limitat
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Rolul nostru se limitează la:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Furnizarea unei platforme tehnice pentru afișarea listărilor</li>
            <li>Facilitarea comunicării între utilizatori</li>
            <li>Moderarea conținutului conform politicilor noastre</li>
            <li>Respectarea cerințelor legale aplicabile</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            2. Disclaimere specifice
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.1 Autenticitatea obiectelor
          </h3>
          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#856404' }}>
              🚨 DISCLAIMER AUTENTICITATE
            </p>
            <p style={{ margin: '0', color: '#856404' }}>
              LuxBid NU verifică, nu garantează și nu se pronunță asupra autenticității 
              obiectelor listate pe platformă. Responsabilitatea verificării autenticității 
              revine în totalitate cumpărătorului.
            </p>
          </div>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.2 Starea și calitatea obiectelor
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Nu evaluăm și nu garantăm:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Starea fizică a obiectelor</li>
            <li>Funcționalitatea (pentru ceasuri, electronice)</li>
            <li>Vârsta sau istoricul obiectului</li>
            <li>Existența documentelor de autenticitate</li>
            <li>Valoarea de piață sau de asigurare</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            2.3 Prețuri și evaluări
          </h3>
          <div style={{
            background: '#e8f4fd',
            border: '1px solid #bee5eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <p style={{ margin: '0 0 12px 0', fontWeight: '600', color: '#0c5460' }}>
              💰 DISCLAIMER PREȚURI
            </p>
            <p style={{ margin: '0', color: '#0c5460' }}>
              Prețurile afișate sunt stabilite exclusiv de vânzători. LuxBid nu oferă 
              evaluări, nu recomandă prețuri și nu garantează că prețurile reflectă 
              valoarea reală de piață.
            </p>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            3. Responsabilități ale utilizatorilor
          </h2>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.1 Due diligence obligatorie
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Fiecare utilizator este obligat să:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Verifice autenticitatea</strong> prin experți independenți</li>
            <li><strong>Inspecteze fizic</strong> obiectul înainte de cumpărare</li>
            <li><strong>Negocieze termenii</strong> direct cu cealaltă parte</li>
            <li><strong>Verifice documentele</strong> și certificatele</li>
            <li><strong>Asigure tranzacția</strong> prin metode sigure</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.2 Responsabilități vânzători
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Descrierea corectă și completă a obiectului</li>
            <li>Furnizarea de fotografii reale și necondiționate</li>
            <li>Dezvăluirea oricăror defecte cunoscute</li>
            <li>Posedarea dreptului legal de vânzare</li>
            <li>Respectarea legilor privind vânzarea de bunuri</li>
          </ul>

          <h3 style={{
            fontSize: '22px',
            fontWeight: '600',
            margin: '24px 0 12px 0',
            color: '#D09A1E'
          }}>
            3.3 Responsabilități cumpărători
          </h3>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Verificarea independentă a autenticității</li>
            <li>Inspecția fizică înainte de finalizarea tranzacției</li>
            <li>Verificarea legalității achiziției</li>
            <li>Asigurarea tranzacției prin metode sigure</li>
            <li>Respectarea regulamentelor de import/export</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            4. Limitări de răspundere
          </h2>

          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>
              🚫 LIMITARE MAXIMĂ DE RĂSPUNDERE
            </h4>
            <p style={{ margin: '0', color: '#7f1d1d' }}>
              Răspunderea LuxBid pentru orice daune, pierderi sau prejudicii este limitată 
              la suma de 0 (zero) RON. Nu vom fi niciodată responsabili pentru:
            </p>
          </div>

          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Pierderi financiare</strong> rezultate din tranzacții</li>
            <li><strong>Achiziționarea de obiecte false</strong> sau contrafăcute</li>
            <li><strong>Daune ale obiectelor</strong> în timpul transportului</li>
            <li><strong>Nerespectarea acordurilor</strong> între utilizatori</li>
            <li><strong>Fraudă sau înșelătorie</strong> comisă de utilizatori</li>
            <li><strong>Pierderi indirecte</strong> sau consecințiale</li>
            <li><strong>Lucrul de profit</strong> sau oportunități pierdute</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            5. Recomandări de siguranță
          </h2>

          <div style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#059669' }}>
              💡 BUNELE PRACTICI RECOMANDATE
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#064e3b' }}>
              <li>Întâlnește-te cu vânzătorul în locuri publice sigure</li>
              <li>Cere verificarea de către un expert în autenticitate</li>
              <li>Folosește metode de plată sigure și trasabile</li>
              <li>Solicită toate documentele și certificatele</li>
              <li>Nu plăti niciodată în avans fără garanții</li>
              <li>Verifică istoricul și reputația utilizatorului</li>
              <li>Documentează toate comunicările</li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            6. Obiecte interzise
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Următoarele categorii de obiecte sunt strict interzise pe platformă:
          </p>

          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '16px'
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#dc2626' }}>
              🚫 OBIECTE INTERZISE
            </h4>
            <ul style={{ margin: '0', paddingLeft: '20px', color: '#7f1d1d' }}>
              <li><strong>Obiecte false, replici sau contrafăcute</strong></li>
              <li><strong>Obiecte furate</strong> sau cu proveniență ilegală</li>
              <li><strong>Obiecte cu restricții legale</strong> (embargouri, etc.)</li>
              <li><strong>Arme sau obiecte periculoase</strong></li>
              <li><strong>Obiecte cu valoare istorică protejată</strong></li>
              <li><strong>Produse care încalcă drepturi de autor</strong></li>
            </ul>
          </div>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            7. Modificări ale serviciului
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Ne rezervăm dreptul de a:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li>Modifica sau întrerupe serviciile în orice moment</li>
            <li>Elimina conținut care încalcă politicile noastre</li>
            <li>Suspenda sau închide conturi problematice</li>
            <li>Actualiza aceste disclaimere fără notificare prealabilă</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            8. Lege aplicabilă și jurisdicția
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Aceste disclaimere și orice disputuri vor fi guvernate de:
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '20px' }}>
            <li><strong>Legea română</strong> pentru toate aspectele</li>
            <li><strong>Instanțele din București</strong> pentru dispute</li>
            <li><strong>Regulamentele UE</strong> pentru protecția consumatorului</li>
            <li><strong>Convențiile internaționale</strong> relevante</li>
          </ul>

          <h2 style={{
            fontSize: '28px',
            fontWeight: '600',
            margin: '32px 0 16px 0',
            color: '#1a1a1a'
          }}>
            9. Contact pentru clarificări
          </h2>

          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e9ecef',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Pentru întrebări despre aceste disclaimere:</strong>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Email:</strong> <a href="mailto:legal@luxbid.ro" style={{ color: '#D09A1E' }}>legal@luxbid.ro</a>
            </p>
            <p style={{ margin: '0 0 8px 0' }}>
              <strong>Telefon:</strong> +40 21 XXX XXXX
            </p>
            <p style={{ margin: '0 0 0 0' }}>
              <strong>Program:</strong> Luni - Vineri, 09:00 - 17:00
            </p>
          </div>

          <div style={{
            background: '#fff3cd',
            border: '1px solid #ffeaa7',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px'
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#856404',
              textAlign: 'center',
              fontWeight: '600'
            }}>
              ⚖️ Prin utilizarea platformei LuxBid, confirmi că ai citit, înțeles și accepți 
              în totalitate toate avertismentele și disclaimerele de mai sus.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
