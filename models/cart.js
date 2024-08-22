import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Product from './product.js';
import User from './user.js';

const Cart = sequelize.define('Cart', {
  idProduct: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  totalItem: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


User.hasMany(Cart, { foreignKey: 'idUser' });
Cart.belongsTo(User, { foreignKey: 'idUser' });

Product.hasMany(Cart, { foreignKey: 'idProduct' });
Cart.belongsTo(Product, { foreignKey: 'idProduct' });

export default Cart;
