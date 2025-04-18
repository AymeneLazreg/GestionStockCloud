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

const router = express.Router();

router.get('/', getCommandesFournisseur);
router.get('/historique', getHistoriqueCommandes);
router.get('/:id', getCommandeById);



router.post('/nouvelle',
  [ check('fournisseur').isInt().withMessage('ID fournisseur invalide') ],
  creerCommandeFournisseur
);

router.put('/:id/valider', validerCommande);

export default router;
