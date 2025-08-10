import React from 'react'

export default function HomePage() {
  return (
    <>
      <div className="nav">
        <div className="container nav-row">
          <a className="brand" href="#"><span className="lux">Lux</span><span className="bid">Bid</span></a>
          <nav className="nav-menu">
            <a href="#">Ceasuri</a>
            <a href="#">Genți</a>
            <a href="#">Bijuterii</a>
            <a href="#">Oferte</a>
          </nav>
          <div className="nav-search">
            <div className="search-pill">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Caută ceasuri, genți, bijuterii..." />
            </div>
          </div>
          <div className="nav-actions">
            <a className="btn btn-outline" href="#">Conectare</a>
            <a className="btn btn-gold" href="#">Înregistrare</a>
          </div>
        </div>
      </div>

      <section className="hero">
        <div className="container hero-inner">
          <h1>Oferte Premium pentru Articole de Lux</h1>
          <p>Ceasuri, genți și bijuterii de lux cu identitate anonimă și verificare profesională</p>
          <div className="cta-row">
            <a href="#" className="btn-cta">Explorează Ofertele</a>
            <a href="#" className="btn-ghost">&nbsp;&nbsp;&nbsp;&nbsp;</a>
          </div>
        </div>
      </section>

      <div className="surface">
        <div className="container search-row">
          <div className="search-big">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Caută ceasuri, genți, bijuterii..." />
          </div>
          <button className="filter-btn"><i className="fa-solid fa-filter"></i> Filtrează</button>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <h2>Categorii Populare</h2>
          <div className="grid">
            <div className="card">
              <span className="icon-badge"><i className="fa-regular fa-clock"></i></span>
              <h3>Ceasuri de Lux</h3>
              <p>Rolex, Patek Philippe, Audemars Piguet</p>
            </div>
            <div className="card">
              <span className="icon-badge"><i className="fa-solid fa-handbag"></i></span>
              <h3>Genți de Designer</h3>
              <p>Hermès, Chanel, Louis Vuitton, Gucci</p>
            </div>
            <div className="card">
              <span className="icon-badge"><i className="fa-solid fa-chart-line"></i></span>
              <h3>Bijuterii Fine</h3>
              <p>Diamante, aur, pietre prețioase</p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© 2025 LuxBid. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </>
  )
}
