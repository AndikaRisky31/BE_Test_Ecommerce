import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

// Define the PhotoProduct model first
const PhotoProduct = sequelize.define('PhotoProduct', {
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
});

export default PhotoProduct;
