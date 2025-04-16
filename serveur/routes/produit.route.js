import express from "express";
import Produit from "../models/produit.model.js";
import Mouvement from "../models/mouvement.model.js"; // ✅ Import mouvement
import authenticateToken from "../middleware/auth.js";
const router = express.Router();



// ✅ Route POST : créer un produit + mouvement "Entrée"
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { nom, description, prix, quantite_stock, categorie } = req.body;
    const userId = req.user.id; // Utilisateur connecté

    // Vérifier si les données sont valides
    console.log("Données reçues :", req.body);

    // Création du produit
    const nouveauProduit = await Produit.create({
      nom,
      description,
      prix,
      quantite_stock,
      categorie,
    });
    console.log("Produit créé :", nouveauProduit);

    // Ajout automatique du mouvement d'entrée
    try {
      const mouvement = await Mouvement.create({
        produit: nom,
        action: "Entrée",
        quantite: quantite_stock,
        date: new Date().toISOString().slice(0, 10),
        utilisateur_id: userId,
      });
      console.log("✅ Mouvement enregistré pour :", nom, mouvement);
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
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { quantite_stock } = req.body;

    // Vérification du rôle de l'utilisateur (par exemple, admin)


    const produit = await Produit.findByPk(id);
    if (!produit) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (produit.quantite_stock !== quantite_stock) {
      const diffQuantite = quantite_stock - produit.quantite_stock;
      produit.quantite_stock = quantite_stock;
      await produit.save();

      const action = diffQuantite > 0 ? 'Entrée' : 'Sortie';

      await Mouvement.create({
        produit: produit.nom,
        action,
        quantite: Math.abs(diffQuantite),
        date: new Date().toISOString().slice(0, 10),
        utilisateur_id: req.user.id // Assure-toi que l'utilisateur est bien authentifié
      });

      console.log(`✅ Mouvement ${action} enregistré pour ${produit.nom} par utilisateur ${req.user.id}`);
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
