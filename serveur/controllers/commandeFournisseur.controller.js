// controllers/CommandeFournisseur.controller.js
import { validationResult } from 'express-validator';
import db from '../models/index.js';
const {
  CommandeFournisseur,
  Fournisseur,
  LigneCommandeFournisseur,
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


export const validerCommande = async (req, res) => {
  try {
    const commande = await CommandeFournisseur.findByPk(req.params.id);
    if (!commande) {
      return res.status(404).json({
        success: false,
        message: 'Commande introuvable'
      });
    }

    const lignesCount = await LigneCommandeFournisseur.count({
      where: { commande: commande.id }
    });
    if (lignesCount === 0) {
      return res.status(400).json({
        success: false,
        message: 'Impossible de valider une commande vide'
      });
    }

    await commande.update({
      statut: 'Validée',
      date_validation: new Date()
    });

    res.status(200).json({
      success: true,
      message: 'Commande validée avec succès',
      data: commande
    });
  } catch (error) {
    console.error('Erreur validation commande:', error);
    res.status(500).json({
      success: false,
      message: 'Échec de la validation',
      error: error.message
    });
  }
};
