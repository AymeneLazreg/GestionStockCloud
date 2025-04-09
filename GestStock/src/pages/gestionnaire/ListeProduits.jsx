import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

function ListeProduits() {
    const [searchTerm, setSearchTerm] = useState("")
    const [produits, setProduits] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const produitsParPage = 10

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const res = await fetch("http://localhost:8832/api/produits")
                if (!res.ok) throw new Error("Erreur de chargement des produits")
                const data = await res.json()
                setProduits(data)
            } catch (err) {
                console.error(err)
            }
        }

        fetchProduits()
    }, [])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
        setCurrentPage(1)
    }

    const filteredProduits = produits.filter((produit) =>
        produit.nom.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const indexOfLastProduit = currentPage * produitsParPage
    const indexOfFirstProduit = indexOfLastProduit - produitsParPage
    const currentProduits = filteredProduits.slice(indexOfFirstProduit, indexOfLastProduit)

    const totalPages = Math.ceil(filteredProduits.length / produitsParPage)

    return (
        <>
            <Header title="Liste des produits" />

            <div className="body">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            className="search-input with-icon"
                            placeholder="Rechercher un produit..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </div>
                </div>

                <div className="produits-list">
                    <div className="produits-header">
                        <div className="produit-cell">Nom</div>
                        <div className="produit-cell">Quantité</div>
                        <div className="produit-cell">Prix</div>
                    </div>

                    {currentProduits.map((produit) => (
                        <div key={produit.id} className="produit-row">
                            <div className="produit-cell">{produit.nom}</div>
                            <div className="produit-cell">{produit.quantite_stock}</div>
                            <div className="produit-cell">{produit.prix.toFixed(2)} €</div>
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
                <button className="btn">Liste Cartons</button>
                <button className="btn">Créer un Carton</button>
                <Link to="/stock" className="btn">Retour</Link>
            </div>

            <BarNavigation />

            {/* STYLES INTÉGRÉS */}
            <style>
                {`
                .pagination {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                    gap: 8px;
                    flex-wrap: wrap;
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
                `}
            </style>
        </>
    )
}

export default ListeProduits
