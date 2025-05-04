// models/ligneCommandeClient.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const LigneCommandeClient = sequelize.define('LigneCommandeClient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  commande: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  produit: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prix_unitaire: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, {
  tableName: 'lignes_commande_client',
  timestamps: true, // ✅ ACTIVE les champs createdAt et updatedAt
});

export default LigneCommandeClient;
