// controllers/ligneCommandeFournisseur.controller.js
import db from '../models/index.js';
const {
  LigneCommandeFournisseur,
  CommandeFournisseur,
  Produit
} = db;

export const creerLigne = async (req, res) => {
  try {
    const nouvelleLigne = await LigneCommandeFournisseur.create(req.body);

    // Recalculer le total
    const lignes = await LigneCommandeFournisseur.findAll({
      where: { commande: req.body.commande }
    });
    const total = lignes
      .reduce((sum, l) => sum + l.quantité * l.prix_unitaire, 0);
    await CommandeFournisseur.update(
      { montant_totale: total },
      { where: { id: req.body.commande } }
    );

    res.status(201).json(nouvelleLigne);
  } catch (error) {
    console.error('Erreur ajout ligne :', error);
    res.status(500).json({ error: error.message });
  }
};

export const getLignesParCommande = async (req, res) => {
  try {
    const lignes = await LigneCommandeFournisseur.findAll({
      where: { commande: req.params.commandeId },
      include: [{
        model: Produit,
        as: 'produitInfo',
        attributes: ['id', 'nom', 'prix']
      }]
    });
    res.json(lignes);
  } catch (error) {
    console.error('Erreur récupération lignes :', error);
    res.status(500).json({ error: error.message });
  }
};
