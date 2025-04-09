import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Categorie = sequelize.define('Categorie', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'categorie',
  timestamps: false,
});

export default Categorie;
