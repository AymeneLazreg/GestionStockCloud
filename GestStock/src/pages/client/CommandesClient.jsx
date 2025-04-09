"use client"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import MenuListe from "../../components/MenuListe"

function CommandesClient() {
  const navigate = useNavigate()
  const menuItems = ["25/02/2025", "26/02/2025", "27/02/2025", "28/02/2025"]

  const handleNouvelleCommande = () => {
    navigate("/nouvelle-commande-client")
  }

  const handleHistorique = () => {
    navigate("/historique-commandes-client")
  }

  return (
    <>
      <Header title="Commandes" />

      <div className="body">
        <p>Commandes en attente de validation</p>
        <div className="menu">
          <MenuListe items={menuItems} />
        </div>
      </div>

      <button className="btn" onClick={handleNouvelleCommande}>
        Nouvelle Commande
      </button>
      <button className="btn" onClick={handleHistorique}>
        Historique Commandes
      </button>
    </>
  )
}

export default CommandesClient

