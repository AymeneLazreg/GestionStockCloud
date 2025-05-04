// controllers/statistiques.controller.js
import { Sequelize } from 'sequelize';
import db from '../models/index.js';
const { CommandeClient, LigneCommandeClient, Produit } = db;

// 📈 1. Courbe des ventes par jour
export const courbeVentes = async (req, res) => {
  try {
    const ventes = await LigneCommandeClient.findAll({
      attributes: [
        [Sequelize.fn("DATE", Sequelize.col("createdAt")), "date"],
        [Sequelize.fn("SUM", Sequelize.literal("quantite * prix_unitaire")), "total"]
      ],
      group: ["date"],
      order: [[Sequelize.literal("date"), "ASC"]],
      raw: true
    });
    res.json(ventes);
  } catch (e) {
    res.status(500).json({ message: "Erreur courbe ventes", error: e.message });
  }
};

// 🏆 2. Top 5 produits vendus
export const topProduits = async (req, res) => {
  try {
    const result = await LigneCommandeClient.findAll({
      attributes: [
        "produit",
        [Sequelize.fn("SUM", Sequelize.col("quantite")), "totalQuantite"]
      ],
      group: ["produit"],
      include: [{ model: Produit, as: "produitInfo", attributes: ["nom"] }],
      order: [[Sequelize.literal("totalQuantite"), "DESC"]],
      limit: 5
    });
    const top = result.map(r => ({
      nom: r.produitInfo?.nom || "Inconnu",
      quantite: parseInt(r.dataValues.totalQuantite)
    }));
    res.json(top);
  } catch (err) {
    res.status(500).json({ message: "Erreur top produits", error: err.message });
  }
};

// ⚠️ 3. Produits avec stock bas
export const alertesStock = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      where: { quantite_stock: { [Sequelize.Op.lt]: 5 } },
      attributes: ["nom", "quantite_stock"]
    });
    res.json(produits);
  } catch (err) {
    res.status(500).json({ message: "Erreur stock", error: err.message });
  }
};
