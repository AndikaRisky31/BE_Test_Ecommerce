const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    // Get all products and users to link to the cart
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const carts = Array.from({ length: 100 }).map(() => ({
      idProduct: faker.helpers.arrayElement(products).id,
      idUser: faker.helpers.arrayElement(users).id,
      totalItem: faker.number.int({ min: 1, max: 5 }),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert('Carts', carts, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Carts', null, {});
  },
};
