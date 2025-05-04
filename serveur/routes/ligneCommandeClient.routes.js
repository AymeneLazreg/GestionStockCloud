import express from 'express';
import { creerLigneCommandeClient } from '../controllers/ligneCommandeClient.controller.js';
const router = express.Router();

router.post('/', creerLigneCommandeClient);

export default router;
