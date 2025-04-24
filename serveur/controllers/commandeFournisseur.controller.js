// controllers/CommandeFournisseur.controller.js
import { validationResult } from 'express-validator';
import db from '../models/index.js';
import Mouvement from "../models/mouvement.model.js"; // ⚠️ Assure-toi que c'est bien importé
import Produit from '../models/produit.model.js';
import authenticateToken from '../middleware/auth.js';
import { Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import CommandeFournisseur from '../models/commandeFournisseur.model.js';
import LigneCommandeFournisseur from '../models/ligneCommandeFournisseur.model.js';






const {
  
  Fournisseur,
  
} = db;

export const getCommandesFournisseur = async (req, res) => {
  try {
    const commandes = await CommandeFournisseur.findAll({
      where: { statut: 'En Attente' },
      include: [{
        model: Fournisseur,
        as: 'fournisseurInfo',
        attributes: ['id', 'nom']
      }]
    });
    res.json(commandes);
  } catch (error) {
    console.error("Erreur complète :", error);
    res.status(500).json({ error: error.message });
  }
};

export const getCommandeById = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findByPk(req.params.id, {
      include: [
        {
          model: Fournisseur,
          as: 'fournisseurInfo',
          attributes: ['id', 'nom', 'email']
        },
        {
          model: LigneCommandeFournisseur,
          as: 'lignes',
          include: [{
            model: db.Produit,
            as: 'produitInfo',
            attributes: ['id', 'nom', 'prix']
          }]
        }
      ]
    });

    if (!commande) {
      return res.status(404).json({
        success: false,
        message: 'Commande introuvable'
      });
    }

    res.status(200).json({
      success: true,
      data: commande
    });
  } catch (error) {
    console.error("Erreur récupération commande :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur",
      error: error.message
    });
  }
};

export const creerCommandeFournisseur = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => err.msg)
    });
  }

  try {
    const nouvelleCommande = await CommandeFournisseur.create({
      fournisseur: req.body.fournisseur,
      date_commande: new Date(),
      statut: 'En Attente'
    });

    res.status(201).json({
      success: true,
      message: 'Commande créée avec succès',
      data: nouvelleCommande
    });
  } catch (error) {
    console.error('Erreur création commande:', error);
    res.status(500).json({
      success: false,
      message: 'Échec de la création',
      error: error.message
    });
  }
};
export const getHistoriqueCommandes = async (req, res) => {
  try {
    const commandes = await CommandeFournisseur.findAll({
      include: [{
        model: Fournisseur,
        as: 'fournisseurInfo',
        attributes: ['id', 'nom']
      }]
    });
    res.json(commandes);
  } catch (error) {
    console.error("Erreur historique :", error);
    res.status(500).json({ error: error.message });
  }
};



export const validerCommande = [
  authenticateToken,
  async (req, res) => {
    const t = await sequelize.transaction();
    try {
      const commandeId = parseInt(req.params.id, 10);
      const lignes = req.body?.lignes;
      const userId = req.user.id;

      if (!Array.isArray(lignes) || lignes.length === 0) {
        await t.rollback();
        return res.status(400).json({
          success: false,
          message: 'Aucune ligne de commande fournie ou format invalide'
        });
      }

      // Récupère la commande
      const commande = await CommandeFournisseur.findByPk(commandeId, { transaction: t });
      if (!commande) {
        await t.rollback();
        return res.status(404).json({
          success: false,
          message: 'Commande introuvable'
        });
      }

      // On démarre avec le montant existant (utile si on valide plusieurs fois)
      let totalCommande = 0;

      // Pour chaque ligne reçue
      for (const ligne of lignes) {
        const produitId    = ligne.produit;
        const quantite     = ligne.quantite;
        const prixUnitaire = ligne.prix_unitaire;

        // Vérification minimale
        if (!produitId || !quantite || !prixUnitaire) continue;

        // 1) Création de la ligne de commande fournisseur
        await LigneCommandeFournisseur.create({
          commande: commandeId,
          produit: produitId,
          quantité: quantite,
          prix_unitaire: prixUnitaire
        }, { transaction: t });

        // 2) Mise à jour du stock produit
        const produit = await Produit.findByPk(produitId, { transaction: t });
        if (produit) {
          const nouvelleQté = produit.quantite_stock + quantite;
          await produit.update({ quantite_stock: nouvelleQté }, { transaction: t });

          // 3) Enregistrement du mouvement d'entrée
          await Mouvement.create({
            produit: produit.nom,
            action: 'Entrée',
            quantite,
            date: new Date().toISOString().slice(0, 10),
            utilisateur_id: userId
          }, { transaction: t });
        }

        // 4) Calcul du total
        totalCommande += quantite * prixUnitaire;
      }

      // 5) Validation finale de la commande
      await commande.update({
        statut: 'Validée',
        date_validation: new Date(),
        montant_totale: totalCommande
      }, { transaction: t });

      await t.commit();
      return res.status(200).json({
        success: true,
        message: 'Commande validée, stock et mouvements mis à jour',
        commandeId
      });

    } catch (error) {
      await t.rollback();
      console.error('❌ Erreur validation commande :', error);
      return res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la validation',
        error: error.message
      });
    }
  }
];