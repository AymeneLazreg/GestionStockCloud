"use client"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import MenuListe from "../../components/MenuListe"
import BarNavigation from "../../components/BarNavigation"

function HistoriqueCommandesFournisseur() {
  const navigate = useNavigate()
  const menu1Items = ["25/02/2025", "26/02/2025", "27/02/2025", "28/02/2025"]
  const menu2Items = ["Valide", "En Attente", "Livre", "En Attente"]

  const handleRetour = () => {
    navigate("/commandes-fournisseur")
  }

  return (
    <>
      <Header title="Historique Commandes" />

      <div className="body">
        <div className="menu">
          <div className="menu1">
            <p>Commande</p>
            <MenuListe items={menu1Items} />
          </div>
          <div className="menu2">
            <p>Statut</p>
            <MenuListe items={menu2Items} />
          </div>
        </div>
      </div>

      <button className="btn" onClick={handleRetour}>
        Retour
      </button>

      <BarNavigation />
    </>
  )
}

export default HistoriqueCommandesFournisseur

