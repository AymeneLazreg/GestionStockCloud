import express from "express";
import Produit from "../models/produit.model.js";
import Mouvement from "../models/mouvement.model.js"; // ✅ Import mouvement


const router = express.Router();

// ✅ Route POST : créer un produit + mouvement "Entrée"
router.post("/", async (req, res) => {
  try {
    const { nom, description, prix, quantite_stock, categorie } = req.body;

    // Création du produit
    const nouveauProduit = await Produit.create({
      nom,
      description,
      prix,
      quantite_stock,
      categorie,
    });

    // ✅ Ajout automatique du mouvement d'entrée
    try {
      await Mouvement.create({
        produit: nom,
        action: "Entrée",
        quantite: quantite_stock,
        date: new Date().toISOString().slice(0, 10)
      });
      console.log("✅ Mouvement enregistré pour :", nom);
    } catch (mvtErr) {
      console.error("❌ Erreur création mouvement :", mvtErr.message);
      // Ne bloque pas la création du produit si le mouvement échoue
    }

    res.status(201).json(nouveauProduit);
  } catch (error) {
    console.error("❌ Erreur création produit :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// ✅ Route GET : récupérer tous les produits
router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll();
    res.json(produits);
  } catch (error) {
    console.error("Erreur récupération produits :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


// ✅ Route GET stats (remplissage/rupture/etc.)
router.get("/stats", async (req, res) => {
  try {
    const produits = await Produit.findAll();

    const stockMaxTotal = 1000; // Modifier si nécessaire
    const quantiteTotale = produits.reduce((acc, p) => acc + p.quantite_stock, 0);
    const remplissage = Math.round((quantiteTotale / stockMaxTotal) * 100);

    const ruptureStock = produits.filter(p => p.quantite_stock === 0).length;
    const bientotEpuise = produits.filter(p => p.quantite_stock > 0 && p.quantite_stock <= 10).length;

    res.json({
      remplissage,
      ruptureStock,
      bientotEpuise
    });
  } catch (error) {
    console.error("Erreur stats stock :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


// ✅ Route PUT : mettre à jour un produit
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite_stock } = req.body;

    // Vérifier si le produit existe
    const produit = await Produit.findByPk(id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    // Si la quantité est différente, mettre à jour le produit
    if (produit.quantite_stock !== quantite_stock) {
      // Calcul de la différence de quantité
      const diffQuantite = quantite_stock - produit.quantite_stock;

      // Mettre à jour le produit avec la nouvelle quantité
      produit.quantite_stock = quantite_stock;
      await produit.save();

      // Ajouter un mouvement d'entrée ou de sortie en fonction de la différence de stock
      const action = diffQuantite > 0 ? "Entrée" : "Sortie";
      await Mouvement.create({
        produit: produit.nom,
        action,
        quantite: Math.abs(diffQuantite),
        date: new Date().toISOString().slice(0, 10),
      });

      console.log(`✅ Mouvement de type ${action} enregistré pour :`, produit.nom);
    }

    res.status(200).json(produit);
  } catch (error) {
    console.error("❌ Erreur mise à jour produit :", error.message);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});


// Exemple de route GET pour récupérer un produit par son ID
router.get('/:id', async (req, res) => {
  console.log('Requête reçue pour l\'ID :', req.params.id); // Log de l'ID
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.json(produit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});




export default router;
