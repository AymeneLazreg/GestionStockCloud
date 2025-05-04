import express from "express";
import db from "../models/index.js";
import { Op, fn, col, literal } from "sequelize";

const router = express.Router();
const { LigneCommandeClient, Produit, CommandeClient } = db;

// 📈 1. Courbe des ventes par jour
router.get("/ventes", async (req, res) => {
  try {
    const ventes = await LigneCommandeClient.findAll({
      attributes: [
        [fn("DATE", col("LigneCommandeClient.createdAt")), "date"],
        [fn("SUM", literal("quantite * prix_unitaire")), "total"]
      ],
      include: [{
        model: CommandeClient,
        as: "commandeInfo",
        attributes: [], // 🔥 on évite de SELECT les colonnes de la jointure
        where: { statut: "Validée" }
      }],
      group: [fn("DATE", col("LigneCommandeClient.createdAt"))],
      order: [[fn("DATE", col("LigneCommandeClient.createdAt")), "ASC"]]
    });

    res.json(ventes.map(v => ({
      date: v.getDataValue("date"),
      total: parseFloat(v.getDataValue("total"))
    })));
  } catch (e) {
    console.error("Erreur /ventes :", e);
    res.status(500).json({ message: "Erreur serveur" });
  }
});



// 🏆 2. Top 5 produits vendus
router.get("/top-produits", async (req, res) => {
  try {
    const top = await LigneCommandeClient.findAll({
      attributes: [
        [col("produitInfo.nom"), "nom"],
        [fn("SUM", col("quantite")), "quantite"]
      ],
      include: [{
        model: Produit,
        as: "produitInfo",
        attributes: []
      }],
      group: ["produitInfo.nom"],
      order: [[fn("SUM", col("quantite")), "DESC"]],
      limit: 5
    });

    res.json(top.map(p => ({
      nom: p.getDataValue("nom"),
      quantite: parseInt(p.getDataValue("quantite"))
    })));
  } catch (e) {
    console.error("Erreur /top-produits :", e);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ⚠️ 3. Produits en alerte de stock (<= 5 unités)
router.get("/stock-alertes", async (req, res) => {
  try {
    const produits = await Produit.findAll({
      where: {
        quantite_stock: { [Op.lte]: 5 }
      }
    });

    res.json(produits.map(p => ({
      nom: p.nom,
      quantite_stock: p.quantite_stock
    })));
  } catch (e) {
    console.error("Erreur /stock-alertes :", e);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
