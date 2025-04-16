import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Mouvement = sequelize.define('mouvement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  action: {
    type: DataTypes.ENUM('Entrée', 'Sortie'),
    allowNull: false
  },
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'mouvement',
  timestamps: false
});

export default Mouvement;
