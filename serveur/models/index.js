// models/index.js
import sequelize from '../config/db.js';
import Produit from './produit.model.js';

const db = {
  sequelize,
  Produit,
};

export default db;
