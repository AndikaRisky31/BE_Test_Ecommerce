const { INTEGER, STRING, DECIMAL, TEXT, DATE } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      name: {
        type: STRING,
      },
      price: {
        type: DECIMAL,
      },
      description: {
        type: TEXT,
      },
      category: {
        type: STRING,
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
    await queryInterface.dropTable('Products');
  },
};
