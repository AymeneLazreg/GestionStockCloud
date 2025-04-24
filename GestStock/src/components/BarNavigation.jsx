import { Link } from "react-router-dom"
import homeIcon from "../assets/icon.png"
import commandeIcon from "../assets/calendar.png"
import stockIcon from "../assets/folder.png"

const BarNavigation = () => {
  return (
    <div className="Bar"
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#f8f9fa",
        padding: "10px 0",
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 1000,
        marginBottom: "-5px",
      }}>
      {/* Utilisation de Link pour la navigation */}
      <Link to="/accueil-gestionnaire">
        <img src={homeIcon || "/placeholder.svg"} className="menu-img" alt="Accueil" />
      </Link>
      <Link to="/stock">
        <img src={stockIcon || "/placeholder.svg"} className="menu-img" alt="Stock" />
      </Link>
      <Link to="/commandes-fournisseur">
        <img src={commandeIcon || "/placeholder.svg"} className="menu-img" alt="Commande" />
      </Link>
    </div>
  )
}

export default BarNavigation

