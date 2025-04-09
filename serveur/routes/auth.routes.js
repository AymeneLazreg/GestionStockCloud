import express from 'express';
import { register, login } from '../controllers/auth.controller.js'; // Assure-toi que tu utilises la bonne importation

const router = express.Router();

// Route d'inscription
router.post('/register', register);

// Route de connexion
router.post('/login', login);

export default router; // Assure-toi d'utiliser "export default"
