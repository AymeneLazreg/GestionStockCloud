import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.route.js'; // 👈 Ajout de la route utilisateur
import sequelize from './config/db.js';
import produitRoutes from './routes/produit.route.js'
import categorieRoutes from './routes/categorie.route.js'



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
