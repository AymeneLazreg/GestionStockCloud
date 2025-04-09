"use client"
import ButtonComponent from "../components/ButtonComponent"

const ProductHistory = ({ onBack }) => {
  const historyData = [
    { date: "25/02/2025", type: "Entrée", produit: "Miel", quantite: "10" },
    { date: "28/02/2025", type: "Entrée", produit: "Yaourt", quantite: "25" },
    { date: "03/03/2025", type: "Sortie", produit: "Patate", quantite: "39" },
    { date: "06/03/2025", type: "Entrée", produit: "Carotte", quantite: "40" },
  ]

  return (
    <div className="history-container">
      <div className="history-table">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Produit</th>
              <th>Quantité</th>
            </tr>
          </thead>
          <tbody>
            {historyData.map((item, index) => (
              <tr key={index} className="table-row">
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.produit}</td>
                <td>{item.quantite}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-note">Cliquez sur le produit pour plus de details</div>

      <div className="button-center">
        <ButtonComponent className="purple-button" onClick={onBack}>
          Retour
        </ButtonComponent>
      </div>
    </div>
  )
}

export default ProductHistory

