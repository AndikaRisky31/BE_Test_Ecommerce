const { INTEGER, STRING, DATE } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('PhotoProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      url: {
        type: STRING,
        allowNull: false,
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
    await queryInterface.dropTable('PhotoProducts');
  },
};
