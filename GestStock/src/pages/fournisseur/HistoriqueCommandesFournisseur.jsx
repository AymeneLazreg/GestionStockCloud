import { useEffect, useState } from "react";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

function HistoriqueCommandesFournisseur() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistorique = async () => {
      try {
        const res = await fetch("http://localhost:8832/api/commandes-fournisseur/historique");
        if (!res.ok) throw new Error("Erreur serveur");
        const data = await res.json();
        setCommandes(data);
      } catch (err) {
        console.error("Erreur chargement historique :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistorique();
  }, []);

  if (loading) return <div>Chargement…</div>;

  return (
    <>
      <Header title="Historique des commandes" />

      <div className="p-4">
        {commandes.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {commandes.map((cmd) => (
              <div
                key={cmd.id}
                className="bg-white p-4 rounded shadow"
              >
                <p className="font-semibold text-lg">
                  Commande #{cmd.id}
                </p>
                <p>Date : {new Date(cmd.date_commande).toLocaleDateString('fr-FR')}</p>
                <p>Fournisseur : {cmd.fournisseurInfo?.nom}</p>
                <p>Statut : {cmd.statut}</p>
                {cmd.date_validation && (
                  <p>Date validation : {new Date(cmd.date_validation).toLocaleDateString('fr-FR')}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-4">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Retour
        </button>
      </div>

      <BarNavigation />
    </>
  );
}

export default HistoriqueCommandesFournisseur;
