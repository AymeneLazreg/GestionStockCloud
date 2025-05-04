import Sequelize from 'sequelize';
import sequelize from '../config/db.js';
import Mouvement from './mouvement.model.js';

import Produit from './produit.model.js';
import Fournisseur from './fournisseur.model.js';
import CommandeFournisseur from './commandeFournisseur.model.js';
import LigneCommandeFournisseur from './ligneCommandeFournisseur.model.js';
import CommandeClient from './commandeClient.model.js';
import LigneCommandeClient from './ligneCommandeClient.model.js';

const db = {
  Sequelize,
  sequelize,
  Produit,
  Fournisseur,
  CommandeFournisseur,
  LigneCommandeFournisseur,
  CommandeClient,
  LigneCommandeClient,
  Mouvement, // ✅ obligatoire
};

// === Associations Fournisseur ===

db.Fournisseur.hasMany(db.CommandeFournisseur, {
  foreignKey: 'fournisseur',
  as: 'commandes'
});

db.CommandeFournisseur.belongsTo(db.Fournisseur, {
  foreignKey: 'fournisseur',
  as: 'fournisseurInfo'
});

db.CommandeFournisseur.hasMany(db.LigneCommandeFournisseur, {
  foreignKey: 'commande',
  as: 'lignes'
});

db.LigneCommandeFournisseur.belongsTo(db.CommandeFournisseur, {
  foreignKey: 'commande',
  as: 'commandeInfo'
});

db.LigneCommandeFournisseur.belongsTo(db.Produit, {
  foreignKey: 'produit',
  as: 'produitInfo'
});

// === Associations Client ===

db.CommandeClient.hasMany(db.LigneCommandeClient, {
  foreignKey: 'commande',
  as: 'lignes'
});

db.LigneCommandeClient.belongsTo(db.CommandeClient, {
  foreignKey: 'commande',
  as: 'commandeInfo'
});

db.LigneCommandeClient.belongsTo(db.Produit, {
  foreignKey: 'produit',
  as: 'produitInfo'
});
db.Mouvement.belongsTo(db.Produit, {
  foreignKey: 'produit',
  as: 'produitInfo'
});

export default db;
