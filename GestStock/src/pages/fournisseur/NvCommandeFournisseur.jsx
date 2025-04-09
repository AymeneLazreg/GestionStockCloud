"use client"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import MenuListe from "../../components/MenuListe"
import BarNavigation from "../../components/BarNavigation"

function NvCommandeFournisseur() {
  const navigate = useNavigate()
  const menu1Items = ["Yaourt", "Bananes", "Pommes de Terre", "Carottes", "+"]
  const menu2Items = ["10", "30", "15", "100"]

  const handleEnregistrer = () => {
    console.log("Commande enregistrée")
  }

  const handleValider = () => {
    console.log("Commande validée")
    navigate("/commandes-fournisseur")
  }

  const handleAjoutProduit = () => {
    navigate("/ajout-produit-commande-fournisseur")
  }

  return (
    <>
      <Header title="Nouvelle Commande Fournisseur" />

      <div className="body">
        <div className="menu">
          <div className="menu1">
            <p>Produit</p>
            <MenuListe
              items={menu1Items}
              onItemClick={(item) => {
                if (item === "+") {
                  handleAjoutProduit()
                }
              }}
            />
          </div>
          <div className="menu2">
            <p>Quantite</p>
            <MenuListe items={menu2Items} />
          </div>
        </div>
      </div>

      <button className="btn" onClick={handleEnregistrer}>
        Enregistrer
      </button>
      <button className="btn" onClick={handleValider}>
        Valider
      </button>

      <BarNavigation />
    </>
  )
}

export default NvCommandeFournisseur

