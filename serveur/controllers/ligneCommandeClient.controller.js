// controllers/ligneCommandeClient.controller.js
import db from '../models/index.js';
const { LigneCommandeClient, Produit, CommandeClient } = db;

export const creerLigneCommandeClient = async (req, res) => {
  try {
    const { commande, produit, quantite } = req.body;

    if (!commande || !produit || !quantite) {
      return res.status(400).json({ message: 'Champs requis manquants' });
    }

    const produitTrouve = await Produit.findOne({ where: { nom: produit } });

    if (!produitTrouve) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }

    if (produitTrouve.quantite_stock < quantite) {
      return res.status(400).json({ message: 'Stock insuffisant' });
    }

    await LigneCommandeClient.create({
      commande,
      produit: produitTrouve.id,
      quantite,
      prix_unitaire: produitTrouve.prix,
    });

    await produitTrouve.save();

    // 🔁 Recalcul du montant total de la commande
    const lignes = await LigneCommandeClient.findAll({ where: { commande } });
    let nouveauTotal = 0;
    for (const l of lignes) {
      nouveauTotal += l.quantite * l.prix_unitaire;
    }

    const commandeObj = await CommandeClient.findByPk(commande);
    if (commandeObj) {
      commandeObj.montant_totale = nouveauTotal;
      await commandeObj.save();
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("❌ Erreur serveur :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
