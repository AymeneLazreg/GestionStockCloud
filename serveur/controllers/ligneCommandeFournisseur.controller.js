// controllers/ligneCommandeFournisseur.controller.js
import db from '../models/index.js';
const {
  LigneCommandeFournisseur,
  CommandeFournisseur,
  Produit
} = db;

export const creerLigne = async (req, res) => {
  try {
    // 1) Extraction et normalisation des champs
    const {
      commande,
      produit,
      quantite,     // sans accent
      quantité,     // avec accent
      prix_unitaire
    } = req.body;

    // Choix de la quantité : on préfère 'quantité' si défini, sinon 'quantite'
    const qte = typeof quantité === 'number'
      ? quantité
      : quantite;

    // 2) Vérification des données obligatoires
    if (!commande || !produit || !qte || !prix_unitaire) {
      return res.status(400).json({
        success: false,
        message: 'Données manquantes ou invalides'
      });
    }

    // 3) Création de la ligne avec la bonne clé 'quantité'
    const nouvelleLigne = await LigneCommandeFournisseur.create({
      commande,
      produit,
      quantité: qte,
      prix_unitaire
    });

    // 4) Recalcul et mise à jour du montant total de la commande
    const lignes = await LigneCommandeFournisseur.findAll({
      where: { commande }
    });

    const total = lignes.reduce(
      (sum, l) => sum + l.quantité * l.prix_unitaire,
      0
    );

    await CommandeFournisseur.update(
      { montant_totale: total },
      { where: { id: commande } }
    );

    // 5) Réponse
    return res.status(201).json({
      success: true,
      data: nouvelleLigne
    });

  } catch (error) {
    console.error('Erreur ajout ligne :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
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
    return res.json(lignes);
  } catch (error) {
    console.error('Erreur récupération lignes :', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur serveur',
      error: error.message
    });
  }
};
