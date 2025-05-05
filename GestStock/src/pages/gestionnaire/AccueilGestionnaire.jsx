import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNotification } from "../../context/NotificationContext";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

import { 
  AlertTriangle, 
  BarChart2, 
  Box, 
  Clock, 
  Database, 
  Package, 
  Shield, 
  TrendingUp, 
  Users, 
  MoreHorizontal,
  ChevronRight,
  ShoppingCart,
  ChartBar
} from "lucide-react";

function AccueilGestionnaire() {
  const [stats, setStats] = useState(null);
  const { addNotification } = useNotification();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://31.207.36.191:8832/api/produits/stats");
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Titre de la section avec animation */}
        <div className="flex items-center space-x-2 mb-8 overflow-hidden">
          <div className="h-12 w-2 bg-gradient-to-b from-purple-600 to-indigo-800 rounded-full animate-pulse" />
          <h2 className="text-2xl font-bold text-gray-800">
            Vue d'ensemble
          </h2>
        </div>
        
        {/* Conteneur d'alertes avec animation d'entrée */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats ? 
            alertes.map((alerte, index) => (
              <div 
                key={alerte.id} 
                className={`bg-white rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden transform hover:-translate-y-1 border-b-4 ${
                  alerte.couleur === "blue" ? "border-blue-500" :
                  alerte.couleur === "red" ? "border-red-500" :
                  "border-green-500"
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{alerte.titre}</h3>
                    <div className={`p-2 rounded-xl ${
                      alerte.couleur === "blue" ? "bg-blue-100 text-blue-600" :
                      alerte.couleur === "red" ? "bg-red-100 text-red-600" :
                      "bg-green-100 text-green-600"
                    }`}>
                      {alerte.icon}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                  {alerte.id === 1 ? (
  <div className="w-24 h-24 mx-auto">
    <CircularProgressbar
      value={stats.remplissage}
      text={`${stats.remplissage}%`}
      styles={buildStyles({
        textColor: "#111827",         // gris foncé
        pathColor: "#10B981",         // vert émeraude
        trailColor: "#E5E7EB",        // gris clair
        textSize: '18px'
      })}
    />
  </div>
) : (
  <p className="text-3xl font-bold">
    {alerte.valeur}
  </p>
)}

                    {alerte.sousTitre && (
                      <p className={`text-sm mt-1 ${
                        alerte.sousTitre.includes("↑") ? "text-green-600" : 
                        alerte.sousTitre.includes("↓") ? "text-red-600" : 
                        "text-gray-500"
                      }`}>
                        {alerte.sousTitre}
                      </p>
                    )}
                  </div>
                  
                  
                </div>
              </div>
            ))
            :
            <div className="col-span-full flex justify-center py-12">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                <p className="mt-4 text-gray-600">Chargement des données...</p>
              </div>
            </div>
          }
        </div>
        
        {/* Actions rapides */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Actions rapides</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/stock" className="bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center">
              <Package className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Gérer le stock</span>
            </Link>
            
            <Link to="/commandes-fournisseur" className="bg-gradient-to-br from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center">
  <Package className="h-6 w-6 mb-2" /> {/* Icône à remplacer si besoin */}
  <span className="text-sm font-medium">Commandes</span>
</Link>

            
<Link to="/Stat-Stock" className="bg-gradient-to-br from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center">
  <ChartBar className="h-6 w-6 mb-2" />
  <span className="text-sm font-medium">statistiques</span>
</Link>

            
            <Link to="/liste-utilisateurs" className="bg-gradient-to-br from-indigo-500 to-indigo-700 hover:from-indigo-600 hover:to-indigo-800 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center">
              <Shield className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Gérer les Rôles</span>
            </Link>

            <Link to="/historique-commandes-client" className="bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex flex-col items-center justify-center">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span className="text-sm font-medium">Commandes Client</span>
            </Link>
          </div>
        </div>
      </main>
      

      <BarNavigation />
    </>
  );
}

export default AccueilGestionnaire;
