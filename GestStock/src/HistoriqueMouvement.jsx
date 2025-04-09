"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

export default function HistoriqueMouvement() {
  const [date, setDate] = useState(new Date())
  const [searchTerm, setSearchTerm] = useState("")
  const [mouvements, setMouvements] = useState([
    {
      id: 1,
      date: "15/03/2025",
      produit: "Produit A",
      type: "Entrée",
      quantite: 10,
      utilisateur: "Jean Dupont",
      source: "Commande #1234",
    },
    {
      id: 2,
      date: "14/03/2025",
      produit: "Produit B",
      type: "Sortie",
      quantite: 5,
      utilisateur: "Marie Martin",
      source: "Vente #5678",
    },
    {
      id: 3,
      date: "13/03/2025",
      produit: "Produit C",
      type: "Entrée",
      quantite: 15,
      utilisateur: "Pierre Durand",
      source: "Commande #1235",
    },
    {
      id: 4,
      date: "12/03/2025",
      produit: "Produit A",
      type: "Sortie",
      quantite: 3,
      utilisateur: "Jean Dupont",
      source: "Vente #5679",
    },
    {
      id: 5,
      date: "11/03/2025",
      produit: "Produit D",
      type: "Entrée",
      quantite: 8,
      utilisateur: "Sophie Petit",
      source: "Commande #1236",
    },
    {
      id: 6,
      date: "10/03/2025",
      produit: "Produit E",
      type: "Sortie",
      quantite: 12,
      utilisateur: "Thomas Grand",
      source: "Vente #5680",
    },
    {
      id: 7,
      date: "09/03/2025",
      produit: "Produit F",
      type: "Entrée",
      quantite: 20,
      utilisateur: "Julie Blanc",
      source: "Commande #1237",
    },
  ])

  const filteredMouvements = mouvements.filter(
    (mouvement) =>
      mouvement.produit.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mouvement.utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mouvement.source.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // SVG icons
  const CalendarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  )

  const SearchIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )

  const FilterIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
  )

  const DownloadIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
  )

  const ArrowLeftIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="19" y1="12" x2="5" y2="12"></line>
      <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
  )

  const ArrowRightIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
      <polyline points="12 5 19 12 12 19"></polyline>
    </svg>
  )

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Historique des Mouvements</h1>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <CalendarIcon />
                {format(date, "dd MMMM yyyy", { locale: fr })}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={(date) => date && setDate(date)} initialFocus />
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="w-full sm:w-auto">
            <FilterIcon />
            <span className="ml-2">Filtres</span>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto">
            <DownloadIcon />
            <span className="ml-2">Exporter</span>
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <SearchIcon />
          </div>
          <Input
            placeholder="Rechercher un produit, un utilisateur ou une source..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Produit</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantité</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMouvements.map((mouvement) => (
                <TableRow key={mouvement.id}>
                  <TableCell>{mouvement.date}</TableCell>
                  <TableCell>{mouvement.produit}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        mouvement.type === "Entrée" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {mouvement.type}
                    </span>
                  </TableCell>
                  <TableCell>{mouvement.quantite}</TableCell>
                  <TableCell>{mouvement.utilisateur}</TableCell>
                  <TableCell>{mouvement.source}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          Affichage de {filteredMouvements.length} sur {mouvements.length} mouvements
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <ArrowLeftIcon />
            <span className="ml-2">Précédent</span>
          </Button>
          <Button variant="outline" size="sm">
            <span className="mr-2">Suivant</span>
            <ArrowRightIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

