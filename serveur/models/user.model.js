import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define('utilisateur', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mdp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Employe',  // Valeur par défaut si 'role' n'est pas fourni
  },
  
}, {
  tableName: 'utilisateurs',  // Utilise 'users' comme nom de table au lieu de 'utilisateur'
  timestamps: false,  // Ajoute des champs de timestamps si nécessaire
});

export default User;
