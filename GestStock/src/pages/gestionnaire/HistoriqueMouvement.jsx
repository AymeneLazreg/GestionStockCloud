"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function HistoriqueMouvement() {
  const navigate = useNavigate()
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")

  const mouvements = [
    {
      id: 1,
      date: "15/03/2025",
      produit: "Produit A",
      type: "Entrée",
      quantite: 10,
      utilisateur: "Jean Dupont",
      source: "Commande #1234",
    },
    {
      id: 2,
      date: "14/03/2025",
      produit: "Produit B",
      type: "Sortie",
      quantite: 5,
      utilisateur: "Marie Martin",
      source: "Vente #5678",
    },
    {
      id: 3,
      date: "13/03/2025",
      produit: "Produit C",
      type: "Entrée",
      quantite: 15,
      utilisateur: "Pierre Durand",
      source: "Commande #1235",
    },
    {
      id: 4,
      date: "12/03/2025",
      produit: "Produit A",
      type: "Sortie",
      quantite: 3,
      utilisateur: "Jean Dupont",
      source: "Vente #5679",
    },
  ]

  const filteredMouvements = mouvements.filter(
    (mouvement) =>
      mouvement.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mouvement.utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mouvement.source.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRetour = () => {
    navigate("/historique-stock")
  }

  return (
    <>
      <Header title="Historique des Mouvements" />

      <div className="body">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher un produit, un utilisateur ou une source..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <label>Date:</label>
            <input
              type="date"
              className="date-input"
              value={date.toISOString().split("T")[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
            />
          </div>
          <button className="filter-btn">Filtrer</button>
        </div>

        <div className="historique-container">
          <div className="historique-header">
            <div className="historique-cell">Date</div>
            <div className="historique-cell">Produit</div>
            <div className="historique-cell">Type</div>
            <div className="historique-cell">Quantité</div>
            <div className="historique-cell">Utilisateur</div>
            <div className="historique-cell">Source</div>
          </div>

          {filteredMouvements.map((mouvement) => (
            <div key={mouvement.id} className="historique-row">
              <div className="historique-cell">{mouvement.date}</div>
              <div className="historique-cell">{mouvement.produit}</div>
              <div className="historique-cell">
                <span className={`status-badge ${mouvement.type === "Entrée" ? "positive" : "negative"}`}>
                  {mouvement.type}
                </span>
              </div>
              <div className="historique-cell">{mouvement.quantite}</div>
              <div className="historique-cell">{mouvement.utilisateur}</div>
              <div className="historique-cell">{mouvement.source}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn">Exporter (PDF)</button>
        <button className="btn" onClick={handleRetour}>
          Retour
        </button>
      </div>

      <BarNavigation />
    </>
  )
}

export default HistoriqueMouvement

