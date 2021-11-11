'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Sections', [
      {
        name: 'banner',
        createdAt: new Date
      },
      {
        name: 'mas vendidos',
        createdAt: new Date
      },
      {
        name: 'promocion',
        createdAt: new Date
      },
      {
        name: 'liquidacion',
        createdAt: new Date
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Sections', null, {});

  }
};
