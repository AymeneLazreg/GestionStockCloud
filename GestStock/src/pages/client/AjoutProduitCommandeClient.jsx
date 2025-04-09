"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"

function AjoutProduitCommandeClient() {
  const navigate = useNavigate()
  const [produit, setProduit] = useState("")
  const [quantite, setQuantite] = useState("")

  const handleValider = () => {
    console.log("Produit ajouté:", { produit, quantite })
    navigate("/nouvelle-commande-client")
  }

  const handleRetour = () => {
    navigate("/nouvelle-commande-client")
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
    </>
  )
}

export default AjoutProduitCommandeClient

