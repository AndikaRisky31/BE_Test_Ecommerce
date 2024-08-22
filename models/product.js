import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import PhotoProduct from './photoproduct.js';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  category: {
    type: DataTypes.STRING,
  },
});

Product.hasMany(PhotoProduct, {
  foreignKey: 'idProduct',
  as: 'photos',
});
PhotoProduct.belongsTo(Product, {
  foreignKey: 'idProduct',
  as: 'product',
});

export default Product;
