import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarNavigation from "../../components/BarNavigation";
import axios from "axios";

function ListeProduits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [produits, setProduits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const produitsParPage = 10;

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const res = await axios.get("http://31.207.36.191:8832/api/produits");
        setProduits(res.data);
      } catch (err) {
        console.error("Erreur lors du chargement des produits:", err);
      }
    };

    fetchProduits();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredProduits = produits.filter((produit) =>
    produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProduit = currentPage * produitsParPage;
  const indexOfFirstProduit = indexOfLastProduit - produitsParPage;
  const currentProduits = filteredProduits.slice(indexOfFirstProduit, indexOfLastProduit);

  const totalPages = Math.ceil(filteredProduits.length / produitsParPage);

  return (
    <>
      <Header title="Liste des produits" />

      <div className="body">
        <div className="filter-container">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="produits-container">
          <div className="produits-header" style = {{ color: "#000000" }}>
            <div className="produits-cell">Nom</div>
            <div className="produits-cell">Quantité</div>
            <div className="produits-cell">Prix</div>
            <div className="produits-cell">Actions</div>
          </div>

          {currentProduits.map((produit) => (
            <div key={produit.id} className="produits-row">
              <div className="produits-cell">{produit.nom}</div>
              <div className="produits-cell">{produit.quantite_stock}</div>
              <div className="produits-cell">{produit.prix} €</div>
              <div className="produits-cell">
                <Link to={`/modifier-produit/${produit.id}`} className="btn-action">Modifier</Link>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              className={`page-btn ${page === currentPage ? "active" : ""}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div className="action-buttons">
        <Link to="/ajout-produit" className="btn">Créer un produit</Link>
        <Link to="/stock" className="btn">Retour</Link>
      </div>

      <BarNavigation />

      {/* STYLES INTÉGRÉS */}
      <style>
        {`
          .filter-container {
            display: flex;
            justify-content: center;
            margin: 20px 0;
          }

          .search-container {
            position: relative;
            width: 300px;
          }

          .search-input {
            width: 100%;
            padding: 10px 20px;
            border-radius: 5px;
            border: 1px solid #ccc;
            font-size: 16px;
            padding-left: 30px;
          }

          .produits-container {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .produits-header {
            display: grid;
            grid-template-columns: 3fr 1fr 1fr 1fr;
            gap: 20px;
            background-color: #f0f0f0;
            padding: 10px;
            font-weight: bold;
            text-align: center;
            border-radius: 5px;
          }

          .produits-cell {
            padding: 10px;
            text-align: center;
          }

          .produits-row {
            display: grid;
            grid-template-columns: 3fr 1fr 1fr 1fr;
            gap: 20px;
            background-color: #fff;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            transition: background-color 0.3s ease;
          }

          .produits-row:hover {
            background-color: #f9f9f9;
          }

          .btn-action {
            padding: 6px 12px;
            background-color: #007bff;
            color: white;
            border-radius: 6px;
            text-decoration: none;
            transition: background-color 0.3s;
          }

          .btn-action:hover {
            background-color: #0056b3;
          }

          .pagination {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            gap: 8px;
          }

          .page-btn {
            padding: 6px 12px;
            border: 1px solid #ccc;
            border-radius: 6px;
            background-color: #f9f9f9;
            cursor: pointer;
            font-weight: 500;
            transition: background-color 0.2s, color 0.2s;
          }

          .page-btn:hover {
            background-color: #eaeaea;
          }

          .page-btn.active {
            background-color: #007bff;
            color: white;
            border-color: #007bff;
          }

          .action-buttons {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-top: 20px;
          }

          .btn {
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            transition: background-color 0.3s;
          }

          .btn:hover {
            background-color: #0056b3;
          }
        `}
      </style>
    </>
  );
}

export default ListeProduits;
