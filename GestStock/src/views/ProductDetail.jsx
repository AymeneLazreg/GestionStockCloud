"use client"
import ButtonComponent from "../components/ButtonComponent"
import TextInput from "../components/TextInput"

const ProductDetail = ({ product, onBack }) => {
  return (
    <div className="detail-container">
      <div className="detail-form">
        <div className="form-group">
          <label>Date</label>
          <TextInput defaultValue="25/02/2025" className="gray-input" />
        </div>

        <div className="form-group">
          <label>Type</label>
          <TextInput defaultValue="10" className="gray-input" />
        </div>

        <div className="form-group">
          <label>Produit</label>
          <div className="input-with-button">
            <TextInput defaultValue="Camembert" className="gray-input" />
            <ButtonComponent className="scanner-button">Scanner</ButtonComponent>
          </div>
        </div>

        <div className="form-group">
          <label>Quantité</label>
          <TextInput defaultValue="10" className="gray-input" />
        </div>

        <div className="form-group">
          <label>Utilisateur</label>
          <TextInput defaultValue="10" className="gray-input" />
        </div>

        <div className="form-group">
          <label>Remarques</label>
          <textarea defaultValue="Produits endommagé" className="gray-input textarea" />
        </div>

        <div className="button-center">
          <ButtonComponent className="purple-button" onClick={onBack}>
            Retour
          </ButtonComponent>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail

