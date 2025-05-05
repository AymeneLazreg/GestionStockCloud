import { useEffect, useState } from "react";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";

export default function HistoriqueCommandesFournisseur() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);

    // Pagination
    const itemsPerPage = 3;
    const totalPages = Math.ceil(commandes.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
  
  
  // Modal
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [modalLignes, setModalLignes] = useState([]);

  useEffect(() => {
    fetch("http://31.207.36.191:8832/api/commandes-fournisseur/historique")
      .then(res => res.ok ? res.json() : Promise.reject("Erreur historique"))
      .then(setCommandes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const openModal = async (id) => {
    setShowModal(true);
    setModalLoading(true);
    setSelectedDetails(null);
    setModalLignes([]);

    try {
      const res = await fetch(`http://31.207.36.191:8832/api/commandes-fournisseur/${id}`);
      if (!res.ok) throw new Error("Erreur chargement détails");
      const json = await res.json();
      const details = json.data ?? json;
      setSelectedDetails(details);
      setModalLignes(Array.isArray(details.lignes) ? details.lignes : []);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDetails(null);
    setModalLignes([]);
  };

  if (loading) return <div className="p-4">Chargement…</div>;

  // Découpe des commandes pour la page en cours
  const start = (currentPage - 1) * itemsPerPage;
  const currentCommands = commandes.slice(start, start + itemsPerPage);

  return (
    <>
      <Header title="Historique des commandes" />

      <div className="p-4 space-y-4">
        {commandes.length === 0 ? (
          <p>Aucune commande trouvée.</p>
        ) : (
          currentCommands.map(cmd => (
            <div
              key={cmd.id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={() => openModal(cmd.id)}
            >
              <div className="flex justify-between items-center"
              style={{ width: "250px" }}>
                <div>
                  <p className="font-semibold text-lg">Commande #{cmd.id}</p>
                  <p>Date : {new Date(cmd.date_commande).toLocaleDateString('fr-FR')}</p>
                  <p>Statut : {cmd.statut}</p>
                </div>
                
              </div>
            </div>
          ))
        )}
      </div>

       {/* Pagination numérotée */}
  {totalPages > 1 && (
    <div className="flex justify-center items-center space-x-2 my-4">
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        return (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            }`}
          >
            {page}
          </button>
        );
      })}
      <span className="ml-4 text-sm text-gray-600">
       
      </span>
    </div>
  )}

      {/* Modale */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-11/12 max-w-lg p-6 relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
            >
              ✕
            </button>

            {modalLoading ? (
              <p>Chargement des détails…</p>
            ) : selectedDetails ? (
              <>
                <h2 className="text-2xl font-bold mb-4">
                  Commande #{selectedDetails.id}
                </h2>
                <p className="mb-2">
                  <span className="font-semibold">Fournisseur :</span>{" "}
                  {selectedDetails.fournisseurInfo?.nom || "—"}
                </p>
                <p className="mb-4">
                  <span className="font-semibold">Date :</span>{" "}
                  {new Date(selectedDetails.date_commande).toLocaleDateString('fr-FR')}
                </p>

                <div className="space-y-2 mb-4">
                  {modalLignes.length === 0 ? (
                    <p className="italic">Aucune ligne pour cette commande.</p>
                  ) : (
                    modalLignes.map(l => (
                      <div key={l.id} className="flex justify-between border-b pb-2">
                        <span>{l.produitInfo?.nom || "Produit inconnu"}</span>
                        <span>Qté : {l.quantité}</span>
                        <span>PU : {l.prix_unitaire.toFixed(2)}€</span>
                        <span>Total : {(l.quantité * l.prix_unitaire).toFixed(2)}€</span>
                      </div>
                    ))
                  )}
                </div>

                <p className="text-right font-semibold text-lg">
                  Montant total :{" "}
                  {modalLignes
                    .reduce((sum, l) => sum + l.quantité * l.prix_unitaire, 0)
                    .toFixed(2)}€
                </p>
              </>
            ) : (
              <p className="text-red-500">Impossible de charger les détails.</p>
            )}
          </div>
        </div>
      )}

      <div className="p-4">
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          style={{ width: "50%",
            marginLeft: "25%",
           }
          }
        >
          Retour
        </button>
      </div>

      <BarNavigation />
    </>
  );
}
