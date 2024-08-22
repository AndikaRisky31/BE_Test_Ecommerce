const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    // Get all products to link photos
    const products = await queryInterface.sequelize.query(
      'SELECT id FROM Products',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const photos = products.flatMap(product => (
      Array.from({ length: 3 }).map(() => ({
        url: faker.image.url(),
        idProduct: product.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    )).flat();

    await queryInterface.bulkInsert('PhotoProducts', photos, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('PhotoProducts', null, {});
  },
};
