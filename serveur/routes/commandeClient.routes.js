import express from 'express';
import {
  creerCommandeClient,
  creerCommandeVide,
  getCommandesClient,
  getCommandesByClient,
  getCommandeClientById,
  supprimerCommandeClient,
  validerCommandeClient,
  validerCommande
} from '../controllers/commandeClient.controller.js';

const router = express.Router();




router.post('/', creerCommandeClient);
router.post('/nouvelle', creerCommandeVide);
router.get('/', getCommandesClient); // ← ici
router.get('/detail/:id', getCommandeClientById);      // ✅ détails
router.put('/:id/valider', validerCommandeClient);     // ✅ validation
router.put('/valider/:id', validerCommande);
router.delete('/:id', supprimerCommandeClient);        // ✅ suppression
router.get('/:clientId', getCommandesByClient);        // 🔚 à la fin

export default router;
