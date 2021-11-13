'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Features', [
      {
        name: 'nuevo',
        createdAt: new Date
      },
      {
        name: 'usado',
        createdAt: new Date
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Features', null, {});

  }
};
