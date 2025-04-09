"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function Scanner() {
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

  // SVG icons
  const AlertCircleIcon = () => (
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
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
  )

  const CameraIcon = () => (
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
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>
  )

  const CheckIcon = () => (
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
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  )

  const QrCodeIcon = () => (
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
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
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

  const XIcon = () => (
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
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  )

  const BarcodeIcon = () => (
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
      <path d="M4 7V4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v3"></path>
      <path d="M4 17v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3"></path>
      <line x1="5" y1="7" x2="5" y2="17"></line>
      <line x1="9" y1="7" x2="9" y2="17"></line>
      <line x1="13" y1="7" x2="13" y2="17"></line>
      <line x1="17" y1="7" x2="17" y2="17"></line>
      <line x1="21" y1="7" x2="21" y2="17"></line>
    </svg>
  )

  const InfoIcon = () => (
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
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
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

  // Simulate scanning a QR code
  const startScanner = () => {
    setIsScanning(true)
    setError(null)
    setScanResult(null)

    // In a real app, you would use a library like jsQR or a dedicated scanner library
    // This is just a simulation
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

      // Add to scan history
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

    // Simulate API call to search for product
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

        // Add to scan history
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

  useEffect(() => {
    return () => {
      stopScanner()
    }
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Scanner de Produits</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="camera">
                <div className="flex items-center">
                  <CameraIcon />
                  <span className="ml-2">Scanner</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="manual">
                <div className="flex items-center">
                  <SearchIcon />
                  <span className="ml-2">Recherche Manuelle</span>
                </div>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scanner un code-barres ou QR code</CardTitle>
                  <CardDescription>Positionnez le code dans le cadre pour le scanner automatiquement</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  {!scanResult ? (
                    <>
                      <div className="relative w-full aspect-video max-w-2xl bg-muted rounded-lg overflow-hidden mb-4">
                        {isScanning ? (
                          <>
                            <video ref={videoRef} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-64 h-64 border-2 border-primary animate-pulse"></div>
                            </div>
                            <canvas ref={canvasRef} className="hidden" />
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            <QrCodeIcon className="h-16 w-16 text-muted-foreground mb-4" />
                            <p className="text-muted-foreground text-center">
                              Appuyez sur le bouton ci-dessous pour activer la caméra
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {isScanning ? (
                          <Button variant="destructive" onClick={stopScanner}>
                            <XIcon />
                            <span className="ml-2">Arrêter le scan</span>
                          </Button>
                        ) : (
                          <Button onClick={startScanner}>
                            <CameraIcon />
                            <span className="ml-2">Démarrer le scan</span>
                          </Button>
                        )}
                      </div>
                    </>
                  ) : null}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recherche par code</CardTitle>
                  <CardDescription>Entrez manuellement le code du produit pour le rechercher</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleManualSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="product-code">Code produit</Label>
                      <div className="flex space-x-2">
                        <div className="relative flex-1">
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                            <BarcodeIcon />
                          </div>
                          <Input
                            id="product-code"
                            placeholder="Ex: PROD1234"
                            className="pl-10"
                            value={manualCode}
                            onChange={(e) => setManualCode(e.target.value)}
                          />
                        </div>
                        <Button type="submit">Rechercher</Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircleIcon className="h-4 w-4" />
              <AlertTitle>Erreur</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {scanResult && (
            <Card className="mt-4">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                  <CardTitle>Produit trouvé</CardTitle>
                </div>
                <CardDescription>Détails du produit scanné avec le code {scanResult.code}</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Code</p>
                    <p className="font-medium">{scanResult.code}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Prix</p>
                    <p className="font-medium">{scanResult.product.price}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Nom</p>
                    <p className="font-medium">{scanResult.product.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Stock</p>
                    <p className="font-medium">{scanResult.product.stock} unités</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Catégorie</p>
                    <p className="font-medium">{scanResult.product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Emplacement</p>
                    <p className="font-medium">{scanResult.product.location}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={resetScan}>
                  Nouveau scan
                </Button>
                <Button>
                  Voir détails complets
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Historique des scans</CardTitle>
              <CardDescription>Les derniers produits scannés</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Produit</TableHead>
                      <TableHead>Heure</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {scanHistory.slice(0, 5).map((scan) => (
                      <TableRow key={scan.id}>
                        <TableCell className="font-medium">{scan.code}</TableCell>
                        <TableCell>{scan.product}</TableCell>
                        <TableCell>{scan.timestamp}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Voir tout l'historique
              </Button>
            </CardFooter>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Aide</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Utilisez la caméra pour scanner un code-barres ou un QR code, ou entrez manuellement le code du
                  produit.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Les codes produits commencent généralement par "PROD" suivi de 4 chiffres.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <InfoIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Pour de meilleurs résultats, assurez-vous que le code est bien éclairé et centré dans le cadre.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

