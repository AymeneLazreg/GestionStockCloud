import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import { useNotification } from "../../context/NotificationContext";

function ModifierProduit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addNotification } = useNotification();
  const [produit, setProduit] = useState(null);
  const [newQuantite, setNewQuantite] = useState("");

  useEffect(() => {
    const fetchProduit = async () => {
      try {
        const res = await fetch(`http://localhost:8832/api/produits/${id}`);
        if (!res.ok) throw new Error("Produit non trouvé");
        const data = await res.json();
        setProduit(data);
        setNewQuantite(data.quantite_stock);
      } catch (err) {
        console.error(err);
        addNotification("❌ Erreur de chargement du produit");
      }
    };
  
    fetchProduit();
  }, [id, addNotification]);
  

  const handleChange = (e) => {
    setNewQuantite(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedStock = parseInt(newQuantite);
    if (isNaN(updatedStock)) {
      addNotification("❌ Veuillez saisir une quantité valide");
      return;
    }
    if (produit.quantite_stock === updatedStock) {
      addNotification("Aucun changement de quantité détecté");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8832/api/produits/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantite_stock: updatedStock }),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification du produit");

      addNotification("✅ Produit modifié avec succès !");
      navigate("/stock");
    } catch (err) {
      console.error(err);
      addNotification("❌ Erreur lors de la modification du produit");
    }
  };

  const handleCancel = () => {
    navigate("/stock");
  };

  return (
    <>
      <Header title="Modifier Produit" />
      <div className="body">
        {produit ? (
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label htmlFor="nom">Nom du produit</label>
              <input type="text" id="nom" name="nom" value={produit.nom} disabled />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" value={produit.description} disabled rows="3"></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="quantite_stock">Quantité en stock</label>
              <input
                type="number"
                id="quantite_stock"
                name="quantite_stock"
                value={newQuantite}
                onChange={handleChange}
                min="0"
                required
              />
            </div>
            <div className="form-buttons">
              <button type="submit" className="btn submit-btn">Modifier</button>
              <button type="button" className="btn cancel-btn" onClick={handleCancel}>Annuler</button>
            </div>
          </form>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
      <BarNavigation />
    </>
  );
}

export default ModifierProduit;
