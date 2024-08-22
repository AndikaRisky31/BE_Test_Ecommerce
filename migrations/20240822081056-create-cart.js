const { INTEGER, DATE } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      idProduct: {
        type: INTEGER,
        references: {
          model: 'Products',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      },
      idUser: {
        type: INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      totalItem: {
        type: INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DATE,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Carts');
  },
};
