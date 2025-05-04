import { Link } from "react-router-dom";
import home from "../assets/icon.png";
import commande from "../assets/calendar.png";
import stock from "../assets/folder.png";
import stats from "../assets/stats.png"; // 🔹 Ajoute cette icône dans ton dossier assets

const BarNavig = () => {
  return (
    <div className="Bar">
      <Link to="/accueil-gestionnaire">
        <img src={home || "/placeholder.svg"} className="menu-img" alt="Accueil" />
      </Link>
      <Link to="/stock">
        <img src={stock || "/placeholder.svg"} className="menu-img" alt="Stock" />
      </Link>
      <Link to="/commandes-fournisseur">
        <img src={commande || "/placeholder.svg"} className="menu-img" alt="Commande" />
      </Link>
      <Link to="/stat-stock">
        <img src={stats || "/placeholder.svg"} className="menu-img" alt="Statistiques" />
      </Link>
    </div>
  );
};

export default BarNavig;
