const { faker } = require('@faker-js/faker');

module.exports = {
  up: async (queryInterface) => {
    const users = Array.from({ length: 10 }).map(() => ({
      name: faker.person.fullName(),
      password: faker.internet.password(),
      jwtToken: faker.string.uuid(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
