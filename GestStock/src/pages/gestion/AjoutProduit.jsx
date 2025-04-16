import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"
import { useNotification } from "../../context/NotificationContext" // ✅ Import


const token = localStorage.getItem("token");
console.log("Token récupéré :", token); // Vérifie si le token existe




function AjoutProduit() {
  const navigate = useNavigate()
  const { addNotification } = useNotification(); // ✅ Hook
  const [categories, setCategories] = useState([])
  const [produit, setProduit] = useState({
    nom: "",
    description: "",
    prix: "",
    quantite: "",
    categorie: "",
  })

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8832/api/categories")
        const data = await res.json()
        setCategories(data)
        if (data.length > 0) {
          setProduit((prev) => ({ ...prev, categorie: data[0].id }))
        }
      } catch (err) {
        console.error("Erreur de chargement des catégories:", err)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProduit((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    

    const newProduit = {
      nom: produit.nom,
      description: produit.description,
      prix: parseFloat(produit.prix),
      quantite_stock: parseInt(produit.quantite),
      categorie: parseInt(produit.categorie),
    }

    try {
      console.log("🔐 Token envoyé au backend :", token);

      const res = await fetch("http://localhost:8832/api/produits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // ✅ Ajout du token
        },
        body: JSON.stringify(newProduit),
      })

      if (!res.ok) throw new Error("Erreur lors de l'ajout du produit")

      // ✅ Ajout de la notification
      addNotification("✅ Produit ajouté avec succès !")

      navigate("/stock")
    } catch (err) {
      console.error(err)
      console.log("newProduit : ", newProduit)
      addNotification("❌ Erreur lors de l'ajout du produit !")
    }

    
  }

  const handleCancel = () => {
    navigate("/stock")
  }

  return (
    <>
      <Header title="Ajouter un Produit" />
      <div className="body">
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="nom">Nom du produit</label>
            <input type="text" id="nom" name="nom" value={produit.nom} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" value={produit.description} onChange={handleChange} rows="3"></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="prix">Prix (€)</label>
              <input type="number" id="prix" name="prix" value={produit.prix} onChange={handleChange} step="0.01" min="0" required />
            </div>
            <div className="form-group">
              <label htmlFor="quantite">Quantité initiale</label>
              <input type="number" id="quantite" name="quantite" value={produit.quantite} onChange={handleChange} min="0" required />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="categorie">Catégorie</label>
            <select id="categorie" name="categorie" value={produit.categorie} onChange={handleChange} required>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
          </div>

          <div className="form-buttons">
            <button type="submit" className="btn submit-btn">Ajouter</button>
            <button type="button" className="btn cancel-btn" onClick={handleCancel}>Annuler</button>
          </div>
        </form>
      </div>

      <BarNavigation />

      <style>
  {`
    .form-group input,
    .form-group textarea,
    .form-group select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 5px;
      font-size: 16px;
      color: #333;
      background-color: #fff;  /* Ajout de la couleur de fond pour tous les champs */
      box-sizing: border-box;
    }

    .form-group textarea {
      resize: vertical;
    }

    .form-row {
      display: flex;
      gap: 20px;
      justify-content: space-between;
    }

    .form-row .form-group {
      flex: 1;
    }

    .body {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f9f9f9;
      padding: 20px;
    }
  `}
</style>

    </>
  )
}

export default AjoutProduit
