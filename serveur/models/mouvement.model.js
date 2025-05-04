import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import User from './user.model.js';

const Mouvement = sequelize.define('mouvement', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produit: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
  ,
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
  },
  utilisateur_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'utilisateurs', // ⚠️ doit matcher le nom de la table réelle
      key: 'id'
    }
  }
}, {
  tableName: 'mouvement',
  timestamps: false
});

// ✅ CORRECTION : relation correcte avec la clé `utilisateur_id`
Mouvement.belongsTo(User, { foreignKey: 'utilisateur_id', as: 'utilisateur' });

export default Mouvement;
