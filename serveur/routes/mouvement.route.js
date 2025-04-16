import express from "express";
import Mouvement from "../models/mouvement.model.js";
import { Op } from "sequelize";

const router = express.Router();

// ✅ GET /api/mouvements?dateDebut=YYYY-MM-DD&dateFin=YYYY-MM-DD
router.get("/", async (req, res) => {
  try {
    const { dateDebut, dateFin } = req.query;
    const where = {};

    if (dateDebut && dateFin) {
      where.date = {
        [Op.between]: [dateDebut, dateFin]
      };
    }

    const mouvements = await Mouvement.findAll({ where });
    res.json(mouvements);
  } catch (err) {
    console.error("❌ Erreur récupération des mouvements :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// ✅ POST /api/mouvements — pour ajouter un mouvement manuellement ou via une autre route
router.post("/", async (req, res) => {
  try {
    const { produit, action, quantite, date } = req.body;

    if (!produit || !action || !quantite || !date) {
      return res.status(400).json({ message: "Champs requis manquants." });
    }

    const mouvement = await Mouvement.create({
      produit,
      action,
      quantite,
      date
    });

    res.status(201).json({
      message: "Mouvement enregistré avec succès.",
      mouvement
    });
  } catch (err) {
    console.error("❌ Erreur ajout mouvement :", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
