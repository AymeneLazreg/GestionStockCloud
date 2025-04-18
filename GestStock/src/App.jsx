import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext"; // 👈 AJOUT
import CommandesClient from "./pages/client/CommandesClient";
import HistoriqueCommandesClient from "./pages/client/HistoriqueCommandesClient";
import AjoutProduitCommandeClient from "./pages/client/AjoutProduitCommandeClient";
import NvCommandeClient from "./pages/client/NvCommandeClient";
import CommandesFournisseur from "./pages/fournisseur/CommandesFournisseur";
import HistoriqueCommandesFournisseur from "./pages/fournisseur/HistoriqueCommandesFournisseur";
import AjoutProduitCommandeFournisseur from "./pages/fournisseur/AjoutProduitCommandeFournisseur";
import NvCommandeFournisseur from "./pages/fournisseur/DetailsCommandeFournisseur";
import Stock from "./pages/gestion/Stock";
import HistoriqueStock from "./pages/gestion/HistoriqueStock";
import HistoriqueProduit from "./pages/gestion/HistoriqueProduit";
import AjoutProduit from "./pages/gestion/AjoutProduit";
import AccueilGestionnaire from "./pages/gestionnaire/AccueilGestionnaire";
import ListeProduits from "./pages/gestionnaire/ListeProduits";
import Connection from "./pages/auth/Connection";
import Profile from "./pages/auth/Profile";
import Scanner from "./pages/utils/Scanner";
import ModifierProduit from "./pages/gestion/ModifierProduit"; // adapte le chemin si besoin

import "./App.css";

function App() {
  return (
    <NotificationProvider> {/* ✅ WRAPPER global */}
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
          <Route path="/details-commande-fournisseur" element={<NvCommandeFournisseur />} />
          <Route path="/details-commande-fournisseur/:id" element={<NvCommandeFournisseur />} />
          {/* Pages Gestion */}
          <Route path="/stock" element={<Stock />} />
          <Route path="/historique-stock" element={<HistoriqueStock />} />
          <Route path="/historique-produit" element={<HistoriqueProduit />} />
          <Route path="/ajout-produit" element={<AjoutProduit />} />
          <Route path="/modifier-produit/:id" element={<ModifierProduit />} />


          {/* Pages Gestionnaire */}
          <Route path="/accueil-gestionnaire" element={<AccueilGestionnaire />} />
          <Route path="/liste-produits" element={<ListeProduits />} />
          <Route path="/scanner" element={<Scanner />} />

          {/* Redirection par défaut */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
