"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProductDetailProps {
  product: any
  onBack: () => void
}

export default function ProductDetail({ product, onBack }: ProductDetailProps) {
  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="max-w-md mx-auto w-full space-y-6">
        <div>
          <Label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </Label>
          <Input id="date" defaultValue="25/02/2025" className="w-full bg-[#e9e9ef]" />
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </Label>
          <Input id="type" defaultValue="10" className="w-full bg-[#e9e9ef]" />
        </div>

        <div className="relative">
          <Label htmlFor="produit" className="block text-sm font-medium text-gray-700">
            Produit
          </Label>
          <div className="flex">
            <Input id="produit" defaultValue="Camembert" className="w-full bg-[#e9e9ef]" />
            <Button className="ml-2 bg-[#5c5a8d] hover:bg-[#4a4878] text-white">Scanner</Button>
          </div>
        </div>

        <div>
          <Label htmlFor="quantite" className="block text-sm font-medium text-gray-700">
            Quantité
          </Label>
          <Input id="quantite" defaultValue="10" className="w-full bg-[#e9e9ef]" />
        </div>

        <div>
          <Label htmlFor="utilisateur" className="block text-sm font-medium text-gray-700">
            Utilisateur
          </Label>
          <Input id="utilisateur" defaultValue="10" className="w-full bg-[#e9e9ef]" />
        </div>

        <div>
          <Label htmlFor="remarques" className="block text-sm font-medium text-gray-700">
            Remarques
          </Label>
          <Textarea id="remarques" defaultValue="Produits endommagé" className="w-full bg-[#e9e9ef]" />
        </div>

        <div className="flex justify-center mt-8">
          <Button onClick={onBack} className="bg-[#5c5a8d] hover:bg-[#4a4878] text-white px-8">
            Retour
          </Button>
        </div>
      </div>
    </div>
  )
}

