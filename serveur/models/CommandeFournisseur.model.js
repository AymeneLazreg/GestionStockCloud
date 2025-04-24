import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../config/db.js';
import Fournisseur from './fournisseur.model.js';       // ton modèle Fournisseur
import LigneCommandeFournisseur from './ligneCommandeFournisseur.model.js';


const CommandeFournisseur = sequelize.define('CommandeFournisseur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  date_commande: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  statut: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'En Attente',
  },
  date_validation: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  montant_totale: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  fournisseur: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'fournisseur', // nom exact de la table
      key: 'id',
    }
  },
}, {
  tableName: 'commandes_fournisseur',
  timestamps: false,
});


export default CommandeFournisseur;
