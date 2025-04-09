import { Link } from "react-router-dom"
import "../App.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>Stock (Gestionnaire)</h2>
      <div className="nav-buttons">
        <Link to="/liste-produits">
          <button>Liste produits</button>
        </Link>
        <Link to="/ajout-produit">
          <button>Créer un produit</button>
        </Link>
        <Link to="/liste-cartons">
          <button>Liste Cartons</button>
        </Link>
        <Link to="/creer-carton">
          <button>Créer un Carton</button>
        </Link>
        <Link to="/historique-stock">
          <button>Historique</button>
        </Link>
        <button>Rapport (PDF)</button>
      </div>
    </nav>
  )
}

export default Navbar

