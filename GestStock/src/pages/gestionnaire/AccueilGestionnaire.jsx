import { Link } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function AccueilGestionnaire() {
  const alertes = [
    {
      id: 1,
      titre: "Entrepôt rempli à",
      valeur: "85%",
      icon: "📦",
      couleur: "orange",
    },
    {
      id: 2,
      titre: "Rupture de stock sur",
      valeur: "5 produits",
      icon: "⚠️",
      couleur: "red",
    },
    {
      id: 3,
      titre: "Stock bientôt épuisé",
      valeur: "(>10 pcs)",
      icon: "⚠️",
      couleur: "yellow",
      sousTitre: "3 produits",
    },
  ]

  return (
    <>
      <Header title="Accueil Gestionnaire" />

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
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/stock" className="btn">
          Gérer le stock
        </Link>
        <Link to="/historique-stock" className="btn">
          Voir l'historique
        </Link>
        <Link to="/scanner" className="btn">
          Scanner un produit
        </Link>
      </div>

      <BarNavigation />
    </>
  )
}

export default AccueilGestionnaire

