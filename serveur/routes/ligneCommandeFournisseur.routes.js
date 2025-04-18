// routes/ligneCommandeFournisseur.routes.js
import express from 'express';
import {
  creerLigne,
  getLignesParCommande
} from '../controllers/ligneCommandeFournisseur.controller.js';

const router = express.Router();

router.post('/', creerLigne);
router.get('/:commandeId', getLignesParCommande);

export default router;
