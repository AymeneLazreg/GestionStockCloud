import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function AjoutProduit() {
    const navigate = useNavigate()
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
                    setProduit((prev) => ({ ...prev, categorie: data[0].id })) // par défaut
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
            categorie: parseInt(produit.categorie), // Ensure this matches the foreign key in the model
        };


        try {
            console.log("Produit à envoyer :", newProduit)

            const res = await fetch("http://localhost:8832/api/produits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newProduit),
            })

            if (!res.ok) throw new Error("Erreur lors de l'ajout du produit")
            navigate("/stock")
        } catch (err) {
            console.error(err)
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
        </>
    )
}

export default AjoutProduit
