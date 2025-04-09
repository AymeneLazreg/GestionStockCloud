import { Link } from "react-router-dom"
import homeIcon from "../assets/icon.png"
import commandeIcon from "../assets/calendar.png"
import stockIcon from "../assets/folder.png"

const BarNavigation = () => {
  return (
    <div className="Bar">
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

