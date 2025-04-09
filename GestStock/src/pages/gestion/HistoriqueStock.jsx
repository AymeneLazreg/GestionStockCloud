"use client"

import { Link } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function HistoriqueStock() {
  const historique = [
    { date: "25/02/2025", produit: "Yaourt", action: "Entrée", quantite: "+50" },
    { date: "26/02/2025", produit: "Bananes", action: "Sortie", quantite: "-20" },
    { date: "27/02/2025", produit: "Pommes de Terre", action: "Entrée", quantite: "+100" },
    { date: "28/02/2025", produit: "Carottes", action: "Sortie", quantite: "-30" },
  ]

  return (
    <>
      <Header title="Historique Stock" />

      <div className="body">
        <div className="filter-container">
          <div className="filter-group">
            <label>Du:</label>
            <input type="date" className="date-input" />
          </div>
          <div className="filter-group">
            <label>Au:</label>
            <input type="date" className="date-input" />
          </div>
          <button className="filter-btn">Filtrer</button>
        </div>

        <div className="historique-container">
          <div className="historique-header">
            <div className="historique-cell">Date</div>
            <div className="historique-cell">Produit</div>
            <div className="historique-cell">Action</div>
            <div className="historique-cell">Quantité</div>
          </div>

          {historique.map((item, index) => (
            <div
              key={index}
              className="historique-row"
              onClick={() => (window.location.href = "/historique-mouvement")}
            >
              <div className="historique-cell">{item.date}</div>
              <div className="historique-cell">{item.produit}</div>
              <div className="historique-cell">{item.action}</div>
              <div className="historique-cell">
                <span className={item.quantite.startsWith("+") ? "positive" : "negative"}>{item.quantite}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn">Exporter (PDF)</button>
        <Link to="/stock" className="btn">
          Retour
        </Link>
      </div>

      <BarNavigation />
    </>
  )
}

export default HistoriqueStock

