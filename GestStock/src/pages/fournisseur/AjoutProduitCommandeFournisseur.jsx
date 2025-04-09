"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function AjoutProduitCommandeFournisseur() {
  const navigate = useNavigate()
  const [produit, setProduit] = useState("")
  const [quantite, setQuantite] = useState("")

  const handleValider = () => {
    console.log("Produit ajouté:", { produit, quantite })
    navigate("/nouvelle-commande-fournisseur")
  }

  const handleRetour = () => {
    navigate("/nouvelle-commande-fournisseur")
  }

  return (
    <>
      <Header title="Ajout Produit Commande" />

      <div className="body">
        <div>
          <input
            type="text"
            className="input"
            placeholder="Produit"
            value={produit}
            onChange={(e) => setProduit(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="input"
            placeholder="Quantite"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
          />
        </div>
      </div>

      <button className="btn" onClick={handleValider}>
        Valider
      </button>
      <button className="btn" onClick={handleRetour}>
        Retour
      </button>

      <BarNavigation />
    </>
  )
}

export default AjoutProduitCommandeFournisseur

