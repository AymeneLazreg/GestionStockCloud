"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header"
import BarNavigation from "../../components/BarNavigation"

export default function Scanner() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("camera")
  const [scannedCode, setScannedCode] = useState("")
  const [manualCode, setManualCode] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState(null)
  const [scanHistory, setScanHistory] = useState([
    { id: 1, code: "PROD1234", product: "Produit A", timestamp: "15/03/2025 14:30" },
    { id: 2, code: "PROD5678", product: "Produit B", timestamp: "15/03/2025 14:25" },
    { id: 3, code: "PROD9012", product: "Produit C", timestamp: "15/03/2025 14:20" },
  ])
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // Simuler le scan d'un code QR
  const startScanner = () => {
    setIsScanning(true)
    setError(null)
    setScanResult(null)

    // Dans une vraie application, vous utiliseriez une bibliothèque comme jsQR
    // Ceci est juste une simulation
    setTimeout(() => {
      const mockProductCode =
        "PROD" +
        Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")
      setScannedCode(mockProductCode)
      setIsScanning(false)
      setScanResult({
        code: mockProductCode,
        product: {
          name: "Produit Example",
          price: Math.floor(Math.random() * 100) + 10 + "€",
          stock: Math.floor(Math.random() * 50),
          category: "Catégorie " + String.fromCharCode(65 + Math.floor(Math.random() * 5)),
          location: "Zone " + Math.floor(Math.random() * 5) + ", Étagère " + Math.floor(Math.random() * 10),
        },
      })

      // Ajouter à l'historique de scan
      setScanHistory((prev) => [
        {
          id: Date.now(),
          code: mockProductCode,
          product: "Produit Example",
          timestamp: new Date().toLocaleString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
        ...prev,
      ])
    }, 2000)
  }

  const stopScanner = () => {
    setIsScanning(false)
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks()
      tracks.forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
  }

  const handleManualSearch = (e) => {
    e.preventDefault()
    if (!manualCode.trim()) return

    setError(null)
    setScanResult(null)

    // Simuler un appel API pour rechercher un produit
    setTimeout(() => {
      if (manualCode.startsWith("PROD")) {
        setScanResult({
          code: manualCode,
          product: {
            name: "Produit Manual",
            price: Math.floor(Math.random() * 100) + 10 + "€",
            stock: Math.floor(Math.random() * 50),
            category: "Catégorie " + String.fromCharCode(65 + Math.floor(Math.random() * 5)),
            location: "Zone " + Math.floor(Math.random() * 5) + ", Étagère " + Math.floor(Math.random() * 10),
          },
        })

        // Ajouter à l'historique de scan
        setScanHistory((prev) => [
          {
            id: Date.now(),
            code: manualCode,
            product: "Produit Manual",
            timestamp: new Date().toLocaleString("fr-FR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
          ...prev,
        ])
      } else {
        setError("Produit non trouvé. Vérifiez le code et réessayez.")
      }
    }, 1000)
  }

  const resetScan = () => {
    setScannedCode("")
    setManualCode("")
    setScanResult(null)
    setError(null)
  }

  const handleRetour = () => {
    navigate("/accueil-gestionnaire")
  }

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return (
    <>
      <Header title="Scanner de Produits" />

      <div className="scanner-container">
        <div className="scanner-tabs">
          <button
            className={`scanner-tab ${activeTab === "camera" ? "active" : ""}`}
            onClick={() => setActiveTab("camera")}
          >
            Scanner
          </button>
          <button
            className={`scanner-tab ${activeTab === "manual" ? "active" : ""}`}
            onClick={() => setActiveTab("manual")}
          >
            Recherche Manuelle
          </button>
        </div>

        <div className="scanner-content">
          {activeTab === "camera" && (
            <div className="camera-tab">
              <h3>Scanner un code-barres ou QR code</h3>
              <p>Positionnez le code dans le cadre pour le scanner automatiquement</p>

              {!scanResult ? (
                <>
                  <div className="camera-view">
                    {isScanning ? (
                      <>
                        <video ref={videoRef} className="camera-video" />
                        <div className="scan-target"></div>
                        <canvas ref={canvasRef} className="hidden-canvas" />
                      </>
                    ) : (
                      <div className="camera-placeholder">
                        <div className="qr-icon">📷</div>
                        <p>Appuyez sur le bouton ci-dessous pour activer la caméra</p>
                      </div>
                    )}
                  </div>

                  <div className="scanner-buttons">
                    {isScanning ? (
                      <button className="stop-scan-btn" onClick={stopScanner}>
                        Arrêter le scan
                      </button>
                    ) : (
                      <button className="start-scan-btn" onClick={startScanner}>
                        Démarrer le scan
                      </button>
                    )}
                  </div>
                </>
              ) : null}
            </div>
          )}

          {activeTab === "manual" && (
            <div className="manual-tab">
              <h3>Recherche par code</h3>
              <p>Entrez manuellement le code du produit pour le rechercher</p>

              <form onSubmit={handleManualSearch} className="manual-form">
                <div className="form-group">
                  <label htmlFor="product-code">Code produit</label>
                  <div className="search-input-container">
                    <input
                      id="product-code"
                      placeholder="Ex: PROD1234"
                      value={manualCode}
                      onChange={(e) => setManualCode(e.target.value)}
                    />
                    <button type="submit" className="search-btn">
                      Rechercher
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

        {error && <div className="error-message">⚠️ {error}</div>}

        {scanResult && (
          <div className="scan-result">
            <div className="result-header">
              <span className="success-icon">✓</span>
              <h3>Produit trouvé</h3>
            </div>
            <p className="result-description">Détails du produit scanné avec le code {scanResult.code}</p>

            <div className="product-details">
              <div className="detail-row">
                <div className="detail-item">
                  <p className="detail-label">Code</p>
                  <p className="detail-value">{scanResult.code}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Prix</p>
                  <p className="detail-value">{scanResult.product.price}</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <p className="detail-label">Nom</p>
                  <p className="detail-value">{scanResult.product.name}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Stock</p>
                  <p className="detail-value">{scanResult.product.stock} unités</p>
                </div>
              </div>

              <div className="detail-row">
                <div className="detail-item">
                  <p className="detail-label">Catégorie</p>
                  <p className="detail-value">{scanResult.product.category}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Emplacement</p>
                  <p className="detail-value">{scanResult.product.location}</p>
                </div>
              </div>
            </div>

            <div className="result-actions">
              <button className="new-scan-btn" onClick={resetScan}>
                Nouveau scan
              </button>
              <button className="details-btn">Voir détails complets</button>
            </div>
          </div>
        )}

        <div className="scan-history">
          <h3>Historique des scans</h3>
          <p>Les derniers produits scannés</p>

          <table className="history-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Produit</th>
                <th>Heure</th>
              </tr>
            </thead>
            <tbody>
              {scanHistory.slice(0, 5).map((scan) => (
                <tr key={scan.id}>
                  <td>{scan.code}</td>
                  <td>{scan.product}</td>
                  <td>{scan.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="view-all-btn">Voir tout l'historique</button>
        </div>

        <div className="scanner-help">
          <h3>Aide</h3>
          <ul className="help-list">
            <li>
              Utilisez la caméra pour scanner un code-barres ou un QR code, ou entrez manuellement le code du produit.
            </li>
            <li>Les codes produits commencent généralement par "PROD" suivi de 4 chiffres.</li>
            <li>Pour de meilleurs résultats, assurez-vous que le code est bien éclairé et centré dans le cadre.</li>
          </ul>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn" onClick={handleRetour}>
          Retour
        </button>
      </div>

      <BarNavigation />
    </>
  )
}

