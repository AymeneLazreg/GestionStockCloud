import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Produit from './produit.model.js';
import CommandeFournisseur from './CommandeFournisseur.model.js';

const LigneCommandeFournisseur = sequelize.define('LigneCommandeFournisseur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  produit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'produit',
      key: 'id',
    },
  },
  quantité: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prix_unitaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  commande: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'commandes_fournisseur',
      key: 'id',
    },
  },
}, {
  tableName: 'lignes_commande_fournisseur',
  timestamps: false,
});

export default LigneCommandeFournisseur;
