"use client"

import { useState } from "react"
import ButtonComponent from "../components/ButtonComponent"
import TextInput from "../components/TextInput"

const StockGestionnaire = ({ onViewProduct, onViewHistory }) => {
  const [products, setProducts] = useState([
    { id: "PROD001", name: "Camembert", quantity: 10 },
    { id: "PROD002", name: "Yaourt", quantity: 25 },
    { id: "PROD003", name: "Miel", quantity: 15 },
    { id: "PROD004", name: "Carotte", quantity: 40 },
  ])

  return (
    <div className="stock-container">
      <div className="product-list">
        {products.map((product, index) => (
          <div key={product.id} className="product-item">
            <div className="product-label">id_produit</div>
            <div className="product-input-container">
              <TextInput value={product.id} readOnly />
              {index === 3 ? <span className="delete-icon">×</span> : <span className="dot-icon">•</span>}
            </div>
          </div>
        ))}
      </div>

      <div className="button-grid">
        <ButtonComponent className="purple-button" onClick={() => {}}>
          Liste produits
        </ButtonComponent>
        <ButtonComponent className="purple-button" onClick={() => {}}>
          Créer un produit
        </ButtonComponent>
        <ButtonComponent className="purple-button" onClick={() => {}}>
          Liste Cartons
        </ButtonComponent>
        <ButtonComponent className="purple-button" onClick={() => {}}>
          Créer un Carton
        </ButtonComponent>
      </div>

      <div className="button-full">
        <ButtonComponent className="purple-button" onClick={onViewHistory}>
          Historique
        </ButtonComponent>
        <ButtonComponent className="purple-button" onClick={() => {}}>
          Rapport (pdf)
        </ButtonComponent>
      </div>
    </div>
  )
}

export default StockGestionnaire

