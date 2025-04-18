// models/index.js

import Sequelize from 'sequelize';
import sequelize from '../config/db.js';

import Produit from './produit.model.js';
import Fournisseur from './fournisseur.model.js';
import CommandeFournisseur from './commandeFournisseur.model.js';
import LigneCommandeFournisseur from './ligneCommandeFournisseur.model.js';

const db = {
  Sequelize,
  sequelize,
  Produit,
  Fournisseur,
  CommandeFournisseur,
  LigneCommandeFournisseur
};

// === Associations ===

// Un fournisseur a plusieurs commandes
db.Fournisseur.hasMany(db.CommandeFournisseur, {
  foreignKey: 'fournisseur',
  as: 'commandes'           // alias unique
});

// Chaque commande appartient à un fournisseur
db.CommandeFournisseur.belongsTo(db.Fournisseur, {
  foreignKey: 'fournisseur',
  as: 'fournisseurInfo'     // alias différent
});

// Une commande a plusieurs lignes
db.CommandeFournisseur.hasMany(db.LigneCommandeFournisseur, {
  foreignKey: 'commande',
  as: 'lignes'              // alias unique
});

// Chaque ligne appartient à une commande
db.LigneCommandeFournisseur.belongsTo(db.CommandeFournisseur, {
  foreignKey: 'commande',
  as: 'commandeInfo'        // alias unique
});

// Chaque ligne réfère à un produit
db.LigneCommandeFournisseur.belongsTo(db.Produit, {
  foreignKey: 'produit',
  as: 'produitInfo'         // alias unique
});

// (Optionnel) Si tu veux, tu peux aussi exposer
// db.sequelize.sync() ici ou dans ton server.js

export default db;
