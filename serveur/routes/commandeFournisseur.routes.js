// routes/commandeFournisseur.routes.js
import express from 'express';
import { check } from 'express-validator';
import {
  getCommandesFournisseur,
  creerCommandeFournisseur,
  getCommandeById,
  validerCommande,
  getHistoriqueCommandes
} from '../controllers/CommandeFournisseur.controller.js';
import LigneCommandeFournisseur from '../models/ligneCommandeFournisseur.model.js';
import CommandeFournisseur from '../models/commandeFournisseur.model.js';
import authenticateToken from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCommandesFournisseur);
router.get('/historique', getHistoriqueCommandes);
router.get('/:id', getCommandeById);
router.put(
  '/commandes-fournisseur/:id/valider',
  authenticateToken,
  validerCommande
);



// DELETE /api/commandes-fournisseur/:id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Supprime d'abord les lignes liées à cette commande
    await LigneCommandeFournisseur.destroy({ where: { commande: id } });

    // Puis la commande
    const deleted = await CommandeFournisseur.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ success: false, message: "Commande non trouvée" });
    }

    res.json({ success: true, message: "Commande supprimée avec succès" });
  } catch (error) {
    console.error("Erreur suppression commande:", error);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});


router.post('/nouvelle',
  [ check('fournisseur').isInt().withMessage('ID fournisseur invalide') ],
  creerCommandeFournisseur
);

router.put('/:id/valider', validerCommande);

export default router;
