import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";

function AccueilGestionnaire() {
  const [stats, setStats] = useState(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:8832/api/produits/stats");
        setStats(res.data);

        // ✅ Affiche la notif UNE SEULE FOIS PAR SESSION
        const notified = sessionStorage.getItem("dashboardNotified");
        if (!notified) {
          addNotification("📊 Tableau de bord mis à jour avec succès !");
          sessionStorage.setItem("dashboardNotified", "true");
        }
      } catch (err) {
        console.error("Erreur récupération stats:", err);
      }
    };

    fetchStats();
  }, []);

  const alertes = stats
    ? [
        {
          id: 1,
          titre: "Entrepôt rempli à",
          valeur: `${stats.remplissage}%`,
          icon: "📦",
          couleur: "orange",
        },
        {
          id: 2,
          titre: "Rupture de stock sur",
          valeur: `${stats.ruptureStock} produits`,
          icon: "⚠️",
          couleur: "red",
        },
        {
          id: 3,
          titre: "Stock bientôt épuisé",
          valeur: "(>10 pcs)",
          icon: "⚠️",
          couleur: "yellow",
          sousTitre: `${stats.bientotEpuise} produits`,
        },
      ]
    : [];

  return (
    <>
      <Header title="Accueil" />

      <div className="body">
        <div className="alertes-container">
          {alertes.map((alerte) => (
            <div key={alerte.id} className={`alerte-card alerte-${alerte.couleur}`}>
              <div className="alerte-icon">{alerte.icon}</div>
              <div className="alerte-content">
                <h3>
                  {alerte.titre} <strong>{alerte.valeur}</strong>
                </h3>
                {alerte.sousTitre && <p>{alerte.sousTitre}</p>}
              </div>
            </div>
          ))}
          {!stats && <p>Chargement des données...</p>}
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/stock" className="btn">
          Gérer le stock
        </Link>
        <Link to="/historique-stock" className="btn">
          Voir l'historique
        </Link>
        <Link to="/ajout-produit" className="btn">
          Ajout Rapide
        </Link>
        <Link to={"/liste-utilisateurs"} className="btn"
        
        >
          Gerer les Roles
        </Link>
      </div>

      <BarNavigation />
    </>
  );
}

export default AccueilGestionnaire;
