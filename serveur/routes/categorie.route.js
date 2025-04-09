// routes/categorie.route.js
import express from 'express'
import Categorie from '../models/categorie.model.js'

const router = express.Router()

// Récupère toutes les catégories
router.get('/', async (req, res) => {
  try {
    const categories = await Categorie.findAll()
    res.json(categories)
  } catch (error) {
    console.error("Erreur récupération catégories:", error)
    res.status(500).json({ message: "Erreur serveur" })
  }
})

export default router
