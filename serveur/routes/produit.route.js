// produit.routes.js

import express from "express"
import Produit from "../models/produit.model.js"

const router = express.Router()

// Route POST : créer un produit
router.post("/", async (req, res) => {
  try {
    const { nom, description, prix, quantite_stock, categorie } = req.body

    const nouveauProduit = await Produit.create({
      nom,
      description,
      prix,
      quantite_stock,
      categorie,
    })

    res.status(201).json(nouveauProduit)
  } catch (error) {
    console.error("Erreur création produit :", error)
    res.status(500).json({ message: "Erreur serveur", error: error.message })
  }
})

// Route GET : récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll()
    res.json(produits)
  } catch (error) {
    console.error("Erreur récupération produits :", error)
    res.status(500).json({ message: "Erreur serveur", error: error.message })
  }
})

export default router
