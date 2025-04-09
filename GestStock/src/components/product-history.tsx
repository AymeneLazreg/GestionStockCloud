"use client"

import { Button } from "@/components/ui/button"

interface ProductHistoryProps {
  onBack: () => void
}

export default function ProductHistory({ onBack }: ProductHistoryProps) {
  const historyData = [
    { date: "25/02/2025", type: "Entrée", produit: "Miel", quantite: "10" },
    { date: "28/02/2025", type: "Entrée", produit: "Yaourt", quantite: "25" },
    { date: "03/03/2025", type: "Sortie", produit: "Patate", quantite: "39" },
    { date: "06/03/2025", type: "Entrée", produit: "Carotte", quantite: "40" },
  ]

  return (
    <div className="flex flex-col min-h-screen p-4">
      <div className="flex flex-col bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-4 text-sm text-gray-600 p-2">
          <div className="font-medium">Date</div>
          <div className="font-medium">Type</div>
          <div className="font-medium">Produit</div>
          <div className="font-medium">Quantité</div>
        </div>

        {historyData.map((item, index) => (
          <div key={index} className="grid grid-cols-4 border-t text-sm p-4 hover:bg-gray-50 cursor-pointer">
            <div>{item.date}</div>
            <div>{item.type}</div>
            <div>{item.produit}</div>
            <div>{item.quantite}</div>
          </div>
        ))}
      </div>

      <div className="text-center text-sm text-gray-500 mt-2">Cliquez sur le produit pour plus de details</div>

      <div className="flex justify-center mt-8">
        <Button onClick={onBack} className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white px-8">
          Retour
        </Button>
      </div>
    </div>
  )
}

