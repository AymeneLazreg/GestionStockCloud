import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function CommandesFournisseur() {
  const navigate = useNavigate();
  const [commandes, setCommandes] = useState([]);

  useEffect(() => {
    const fetchCommandes = async () => {
      try {
        const res = await fetch("http://31.207.36.191:8832/api/commandes-fournisseur");
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        setCommandes(data);
      } catch (err) {
        console.error("Erreur :", err);
      }
    };
    fetchCommandes();
  }, []);

  const handleNouvelle = async () => {
    try {
      const res = await fetch("http://31.207.36.191:8832/api/commandes-fournisseur/nouvelle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fournisseur: 1 })
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      navigate(`/details-commande-fournisseur/${json.data.id}`);
    } catch (err) {
      console.error("Erreur création :", err);
    }
  };

  return (
    <>
      <Header title="Commandes Fournisseur" />
      <div className="p-4">
        <h2 className="text-lg mb-4">En attente de validation</h2>
        <div className="grid grid-cols-1 gap-4">
          {commandes.map(cmd => (
            <div
              key={cmd.id}
              onClick={() => navigate(`/details-commande-fournisseur/${cmd.id}`)}
              className="bg-white p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-semibold"># {cmd.id}</p>
              <p>Date : {new Date(cmd.date_commande).toLocaleDateString('fr-FR')}</p>
              <p>Statut : {cmd.statut}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex space-x-2">
          <button
            onClick={handleNouvelle}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Nouvelle commande
          </button>
          <button
            onClick={() => navigate("/historique-commandes-fournisseur")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Historique
          </button>
          
        </div>
      </div>
      <BarNavigation />
    </>
  );
}

export default CommandesFournisseur;
