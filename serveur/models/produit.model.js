import { DataTypes } from 'sequelize'
import sequelize from '../config/db.js'
import Categorie from './categorie.model.js'

const Produit = sequelize.define('produit', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  prix: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  quantite_stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  categorie: { // clé étrangère personnalisée
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'produit',
  timestamps: false
})

// Associations
Produit.belongsTo(Categorie, {
  foreignKey: 'categorie',
  as: 'categorieAssoc' // alias pour éviter les conflits de nom
})

Categorie.hasMany(Produit, {
  foreignKey: 'categorie',
  as: 'produits'
})

export default Produit
