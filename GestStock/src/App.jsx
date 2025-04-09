import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import CommandesClient from "./pages/client/CommandesClient"
import HistoriqueCommandesClient from "./pages/client/HistoriqueCommandesClient"
import AjoutProduitCommandeClient from "./pages/client/AjoutProduitCommandeClient"
import NvCommandeClient from "./pages/client/NvCommandeClient"
import CommandesFournisseur from "./pages/fournisseur/CommandesFournisseur"
import HistoriqueCommandesFournisseur from "./pages/fournisseur/HistoriqueCommandesFournisseur"
import AjoutProduitCommandeFournisseur from "./pages/fournisseur/AjoutProduitCommandeFournisseur"
import NvCommandeFournisseur from "./pages/fournisseur/NvCommandeFournisseur"
import Stock from "./pages/gestion/Stock"
import HistoriqueStock from "./pages/gestion/HistoriqueStock"
import HistoriqueProduit from "./pages/gestion/HistoriqueProduit"
import AjoutProduit from "./pages/gestion/AjoutProduit"
import AccueilGestionnaire from "./pages/gestionnaire/AccueilGestionnaire"
import HistoriqueMouvement from "./pages/gestionnaire/HistoriqueMouvement"
import ListeProduits from "./pages/gestionnaire/ListeProduits"
import Connection from "./pages/auth/Connection"
import Profile from "./pages/auth/Profile"
import Scanner from "./pages/utils/Scanner"
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        {/* Pages d'authentification */}
        <Route path="/login" element={<Connection />} />
        <Route path="/profile" element={<Profile />} />

        {/* Pages Client */}
        <Route path="/commandes-client" element={<CommandesClient />} />
        <Route path="/historique-commandes-client" element={<HistoriqueCommandesClient />} />
        <Route path="/ajout-produit-commande-client" element={<AjoutProduitCommandeClient />} />
        <Route path="/nouvelle-commande-client" element={<NvCommandeClient />} />

        {/* Pages Fournisseur */}
        <Route path="/commandes-fournisseur" element={<CommandesFournisseur />} />
        <Route path="/historique-commandes-fournisseur" element={<HistoriqueCommandesFournisseur />} />
        <Route path="/ajout-produit-commande-fournisseur" element={<AjoutProduitCommandeFournisseur />} />
        <Route path="/nouvelle-commande-fournisseur" element={<NvCommandeFournisseur />} />

        {/* Pages Gestion */}
        <Route path="/stock" element={<Stock />} />
        <Route path="/historique-stock" element={<HistoriqueStock />} />
        <Route path="/historique-produit" element={<HistoriqueProduit />} />
        <Route path="/ajout-produit" element={<AjoutProduit />} />

        {/* Pages Gestionnaire */}
        <Route path="/accueil-gestionnaire" element={<AccueilGestionnaire />} />
        <Route path="/historique-mouvement" element={<HistoriqueMouvement />} />
        <Route path="/liste-produits" element={<ListeProduits />} />
        <Route path="/scanner" element={<Scanner />} />

        {/* Redirection par défaut */}
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

