"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface StockGestionnaireProps {
  onViewProduct: (product: any) => void
  onViewHistory: () => void
}

export default function StockGestionnaire({ onViewProduct, onViewHistory }: StockGestionnaireProps) {
  const [products, setProducts] = useState([
    { id: "PROD001", name: "Camembert", quantity: 10 },
    { id: "PROD002", name: "Yaourt", quantity: 25 },
    { id: "PROD003", name: "Miel", quantity: 15 },
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 text-center">
        <h1 className="text-xl font-medium">Stock (Gestionnaire)</h1>
      </header>

      <div className="flex-1 px-6 pb-6">
        <div className="space-y-4 mb-8">
          {products.map((product, index) => (
            <div key={product.id} className="flex items-center">
              <div className="text-sm text-gray-600 w-24">id_produit</div>
              <div className="flex-1 relative">
                <Input value={product.id} readOnly className="bg-white border-purple-300" />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {index === 3 ? (
                    <X className="h-5 w-5 text-red-500" />
                  ) : (
                    <div className="h-1 w-1 bg-gray-400 rounded-full" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={() => {}}>
            Liste produits
          </Button>
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={() => {}}>
            Créer un produit
          </Button>
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={() => {}}>
            Liste Cartons
          </Button>
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={() => {}}>
            Créer un Carton
          </Button>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4">
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={onViewHistory}>
            Historique
          </Button>
          <Button className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white rounded-full" onClick={() => {}}>
            Rapport (pdf)
          </Button>
        </div>
      </div>
    </div>
  )
}

