"use client"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import MenuListe from "../../components/MenuListe"

function NvCommandeClient() {
  const navigate = useNavigate()
  const menu1Items = ["Yaourt", "Bananes", "Pommes de Terre", "Carottes", "+"]
  const menu2Items = ["10", "30", "15", "100"]

  const handleEnregistrer = () => {
    console.log("Commande enregistrée")
  }

  const handleValider = () => {
    console.log("Commande validée")
    navigate("/commandes-client")
  }

  const handleAjoutProduit = () => {
    navigate("/ajout-produit-commande-client")
  }

  return (
    <>
      <Header title="Nouvelle Commande" />

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
    </>
  )
}

export default NvCommandeClient

