import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HistoriqueStock() {
  const [historique, setHistorique] = useState([]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const navigate = useNavigate()


  const [filtreUtilisateur, setFiltreUtilisateur] = useState("");
  const [filtreProduit, setFiltreProduit] = useState("");
  const [filtreAction, setFiltreAction] = useState("");

  const [page, setPage] = useState(1);
  const itemsParPage = 10;

  const fetchHistorique = async () => {
    try {
      const res = await axios.get("http://localhost:8832/api/mouvements", {
        params: {
          dateDebut,
          dateFin,
        },
      });
      setHistorique(res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement de l'historique:", err);
    }
  };

  useEffect(() => {
    fetchHistorique();
  }, []);

  const handleFiltrer = () => {
    fetchHistorique();
    setPage(1);
  };
  
  const handleBack = () => {
    navigate(-1); // 👈 revient à la page précédente dans l'historique
  };

  const historiqueFiltré = historique.filter((item) => {
    const utilisateurOk =
      filtreUtilisateur === "" ||
      item.utilisateur?.nom?.toLowerCase().includes(filtreUtilisateur.toLowerCase());
    const produitOk =
      filtreProduit === "" ||
      item.produit?.toLowerCase().includes(filtreProduit.toLowerCase());
    const actionOk = filtreAction === "" || item.action === filtreAction;
    return utilisateurOk && produitOk && actionOk;
  });

  const totalPages = Math.ceil(historiqueFiltré.length / itemsParPage);
  const historiquePagine = historiqueFiltré.slice(
    (page - 1) * itemsParPage,
    page * itemsParPage
  );

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Historique des mouvements de stock", 14, 15);
    const tableData = historiqueFiltré.map((item) => {
      const quantityText =
        item.action === "Entrée" ? `+${item.quantite}` : `-${item.quantite}`;
      const utilisateur = item.utilisateur?.nom || "—";
      return [item.date, item.produit, item.action, quantityText, utilisateur];
    });
    autoTable(doc, {
      head: [["Date", "Produit", "Action", "Quantité", "Utilisateur"]],
      body: tableData,
      startY: 20,
    });
    doc.save("historique-stock.pdf");
  };

  return (
    <>
      <Header title="Historique Stock" />

      <style>{`
        .pagination-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
          gap: 10px;
          margin-top: 20px;
          padding: 0 10px;
        }

        .pagination-card {
          text-align: center;
          cursor: pointer;
          padding: 12px;
          border-radius: 12px;
          background-color: #f5f5f5;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
          margin-bottom: 20px;
          transition: background-color 0.2s ease;
        }

        .pagination-card:hover {
          background-color: #e0e0e0;
        }

        .active-page {
          background-color: #007bff;
          color: white;
        }
      `}</style>

      <div className="body">
        <div className="filter-container">
          <div className="filter-group">
            <label>Du:</label>
            <input
              type="date"
              className="date-input"
              value={dateDebut}
              onChange={(e) => setDateDebut(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Au:</label>
            <input
              type="date"
              className="date-input"
              value={dateFin}
              onChange={(e) => setDateFin(e.target.value)}
            />
          </div>
          <button className="filter-btn" onClick={handleFiltrer}>
            Filtrer
          </button>
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <label>Produit:</label>
            <input
              type="text"
              className="text-input"
              value={filtreProduit}
              onChange={(e) => setFiltreProduit(e.target.value)}
              placeholder="Nom du produit"
            />
          </div>

          <div className="filter-group">
            <label>Utilisateur:</label>
            <input
              type="text"
              className="text-input"
              value={filtreUtilisateur}
              onChange={(e) => setFiltreUtilisateur(e.target.value)}
              placeholder="Nom de l'utilisateur"
            />
          </div>

          <div className="filter-group">
            <label>Type:</label>
            <select
              className="select-input"
              value={filtreAction}
              onChange={(e) => setFiltreAction(e.target.value)}
              style={{ 
                backgroundColor: "#ffffff",
               }}
            >
              <option value="">Tous</option>
              <option value="Entrée">Entrée</option>
              <option value="Sortie">Sortie</option>
            </select>
          </div>
        </div>

        <div className="historique-container">
          <div className="historique-header">
            <div className="historique-cell">Date</div>
            <div className="historique-cell">Produit</div>
            <div className="historique-cell">Action</div>
            <div className="historique-cell">Quantité</div>
            <div className="historique-cell">Utilisateur</div>
          </div>

          {historiquePagine.map((item, index) => {
            const isPositive = item.action === "Entrée";
            const quantityText = isPositive ? `+${item.quantite}` : `-${item.quantite}`;
            const quantityClass = isPositive ? "positive" : "negative";

            return (
              <div key={index} className="historique-row">
                <div className="historique-cell">{item.date}</div>
                <div className="historique-cell">{item.produit}</div>
                <div className="historique-cell">{item.action}</div>
                <div className="historique-cell">
                  <span className={quantityClass}>{quantityText}</span>
                </div>
                <div className="historique-cell">
                  {item.utilisateur?.nom || "—"}
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination style cartes */}
        <div className="pagination-grid">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`pagination-card ${page === i + 1 ? "active-page" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn" onClick={exportPDF}>
          Exporter (PDF)
        </button>
        <button onClick={handleBack} className="btn">
      Retour
    </button>
      </div>

      <BarNavigation />
    </>
  );
}

export default HistoriqueStock;
