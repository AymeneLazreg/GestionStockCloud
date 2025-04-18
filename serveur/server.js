import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.route.js'; // 👈 Ajout de la route utilisateur
import sequelize from './config/db.js';
import produitRoutes from './routes/produit.route.js'
import categorieRoutes from './routes/categorie.route.js'
import mouvementRoutes from './routes/mouvement.route.js';
import commandeFournisseurRoutes from './routes/commandeFournisseur.routes.js'; // Assure-toi que le chemin est correct
import ligneCommandeFournisseurRoutes from './routes/ligneCommandeFournisseur.routes.js';
import './models/index.js'; // Assure-toi que le chemin est correct

// Après l'import des modèles :
Object.values(sequelize.models).forEach(model => {
  if (model.associate) {
    model.associate(sequelize.models);
  }
});

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // 👈 Route pour les infos de profil
app.use('/api/produits', produitRoutes)
app.use('/api/categories', categorieRoutes)
app.use('/api/mouvements', mouvementRoutes);
app.use('/api/commandes-fournisseur', commandeFournisseurRoutes); // Avec un 's' à commandes
app.use('/api/lignes-commande-fournisseur', ligneCommandeFournisseurRoutes);


const PORT = process.env.PORT || 8832;

try {
  await sequelize.authenticate();
  console.log('✅ Connexion DB OK');
  
  await sequelize.sync();
  console.log('✅ Modèles synchronisés');

  app.listen(PORT, () => {
    console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`);
  });
} catch (error) {
  console.error('❌ Erreur DB:', error);
}
