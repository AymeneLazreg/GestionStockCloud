// models/commandeClient.model.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const CommandeClient = sequelize.define('CommandeClient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  client: { // ✅ renommé pour correspondre aux contrôleurs
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date_commande: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  statut: {
    type: DataTypes.STRING,
    defaultValue: 'En cours',
  },
  montant_totale: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
}, {
  tableName: 'commandes_client',
  timestamps: false,
});

export default CommandeClient;
