import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function DetailsCommandeFournisseur() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);
  const [produitChoisi, setProduitChoisi] = useState("");
  const [quantite, setQuantite] = useState(1);
  const [lignes, setLignes] = useState([]);
  const [commande, setCommande] = useState(null);
  const [loading, setLoading] = useState(true);

  // Charge la commande + produits + lignes
  useEffect(() => {
    if (!id) return;
    const charger = async () => {
      try {
        const [r1, r2, r3] = await Promise.all([
          fetch("http://localhost:8832/api/produits"),
          fetch(`http://localhost:8832/api/commandes-fournisseur/${id}`),
          fetch(`http://localhost:8832/api/lignes-commande-fournisseur/${id}`)
        ]);

        const produitsData = await r1.json();
        setProduits(produitsData);

        const cmdJson = await r2.json();
        if (cmdJson.success) setCommande(cmdJson.data);
        else console.error("Err cmd:", cmdJson);

        const lignesData = await r3.json();
        setLignes(lignesData);
      } catch (err) {
        console.error("Erreur chargement:", err);
      } finally {
        setLoading(false);
      }
    };
    charger();
  }, [id]);

  // Récupère à nouveau les lignes (après ajout)
  const reloadLignes = async () => {
    const r = await fetch(`http://localhost:8832/api/lignes-commande-fournisseur/${id}`);
    setLignes(await r.json());
  };

  const ajouterProduit = async () => {
    if (!produitChoisi) return;
    try {
      await fetch("http://localhost:8832/api/lignes-commande-fournisseur", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commande: parseInt(id, 10),
          produit: parseInt(produitChoisi, 10),
          quantité: quantite,
          prix_unitaire: produits.find(p => p.id === parseInt(produitChoisi,10)).prix
        })
      });
      setProduitChoisi("");
      setQuantite(1);
      await reloadLignes();
    } catch (err) {
      console.error("Erreur ajout produit:", err);
    }
  };

  const finaliserCommande = async () => {
    try {
      await fetch(
        `http://localhost:8832/api/commandes-fournisseur/${id}/valider`,
        { method: "PUT" }
      );
      navigate("/commandes-fournisseur");
    } catch (err) {
      console.error("Erreur validation:", err);
    }
  };

  if (loading) return <div>Chargement…</div>;
  if (!commande) return <div>Commande introuvable</div>;

  return (
    <>
      <Header title={`Commande #${commande.id}`} />
      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">
            Fournisseur : {commande.fournisseurInfo?.nom}
          </h2>
          <p>
            Date : {new Date(commande.date_commande)
              .toLocaleDateString('fr-FR')}
          </p>
          <p>Statut : {commande.statut}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-8">
          {lignes.map(l => (
            <div key={l.id} className="bg-white p-4 rounded shadow">
              <h3 className="font-semibold">
                {l.produitInfo?.nom}
              </h3>
              <p>Quantité : {l.quantité}</p>
              <p>PU : {l.prix_unitaire}€</p>
              <p>Total : {(l.quantité * l.prix_unitaire).toFixed(2)}€</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-bold mb-4">Ajouter un produit</h3>

          <select
            value={produitChoisi}
            onChange={e => setProduitChoisi(e.target.value)}
            className="p-2 border rounded mb-4 w-full"
            style={{ color: produitChoisi ? "black" : "white" }}
          >
            <option value="">Choisir un produit</option>
            {produits.map(p => (
              <option key={p.id} value={p.id}>
                {p.nom} – {p.prix}€
              </option>
            ))}
          </select>

          <input
            type="number"
            value={quantite}
            onChange={e => setQuantite(parseInt(e.target.value, 10))}
            min="1"
            className="p-2 border rounded mb-4 w-full"
          />

          <button
            onClick={ajouterProduit}
            disabled={!produitChoisi}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Ajouter
          </button>

          <button
            onClick={finaliserCommande}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-4"
          >
            Finaliser la commande
          </button>

          <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 margin-left: 10px"
          style={{ marginLeft: "10px" }}
        >
          Retour
        </button>
        </div>
      </div>
      <BarNavigation />
    </>
  );
}

export default DetailsCommandeFournisseur;
