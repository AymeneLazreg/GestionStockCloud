import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function AjoutProduitCommandeFournisseur() {
  const navigate = useNavigate()
  const [produit, setProduit] = useState("") // Nom du produit
  const [quantite, setQuantite] = useState("") // Quantité
  const [commandeId, setCommandeId] = useState(1) // Id de la commande (tu pourrais le récupérer dynamiquement)

  // Fonction pour ajouter un produit à la commande
  const handleValider = async () => {
    console.log("Produit ajouté:", { produit, quantite })

    // Envoi des données au backend
    try {
      const response = await fetch('/api/ligne-commande-fournisseur/ajouter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ produit, quantite, commande: commandeId }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du produit à la commande");
      }

      const data = await response.json();
      console.log("Produit ajouté à la commande:", data);
      navigate("/nouvelle-commande-fournisseur"); // Rediriger après l'ajout
    } catch (error) {
      console.error("Erreur d'ajout de produit:", error);
    }
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
            type="number"
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
