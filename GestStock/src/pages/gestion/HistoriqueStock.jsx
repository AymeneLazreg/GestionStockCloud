import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function HistoriqueStock() {
  const [historique, setHistorique] = useState([]);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const fetchHistorique = async () => {
    try {
      const res = await axios.get("http://localhost:8832/api/mouvements", {
        params: {
          dateDebut,
          dateFin,
        },
      });
      console.log("📦 Données récupérées de l'API :", res.data);
      setHistorique(res.data);
    } catch (err) {
      console.error("❌ Erreur lors du chargement de l'historique:", err);
    }
  };

  useEffect(() => {
    fetchHistorique();
  }, []);

  const handleFiltrer = () => {
    console.log("📅 Filtrage lancé :", dateDebut, "→", dateFin);
    fetchHistorique();
  };

  const exportPDF = () => {
    console.log("📥 Export PDF lancé !");
    const doc = new jsPDF();

    doc.text("Historique des mouvements de stock", 14, 15);

    const tableData = historique.map((item) => {
      const isPositive = item.action === "Entrée";
      const quantityText = isPositive ? `+${item.quantite}` : `-${item.quantite}`;
      const utilisateur = item.utilisateur?.nom || "—";

      return [
        item.date,
        item.produit,
        item.action,
        quantityText,
        utilisateur,
      ];
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

        <div className="historique-container">
          <div className="historique-header">
            <div className="historique-cell">Date</div>
            <div className="historique-cell">Produit</div>
            <div className="historique-cell">Action</div>
            <div className="historique-cell">Quantité</div>
            <div className="historique-cell">Utilisateur</div>
          </div>

          {historique.map((item, index) => {
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
                <div className="historique-cell">{item.utilisateur?.nom || "—"}</div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn" onClick={exportPDF}>
          Exporter (PDF)
        </button>
        <Link to="/stock" className="btn">
          Retour
        </Link>
      </div>

      <BarNavigation />
    </>
  );
}

export default HistoriqueStock;
