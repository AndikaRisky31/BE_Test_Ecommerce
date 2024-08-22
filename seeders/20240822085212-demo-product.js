const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const products = Array.from({ length: 50 }).map(() => ({
      name: faker.commerce.product(),
      price: faker.commerce.price(),
      description: faker.commerce.productAdjective(),
      category: faker.commerce.department(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Products', products, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Products', null, {});
  },
};