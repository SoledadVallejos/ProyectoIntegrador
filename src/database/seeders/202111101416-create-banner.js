'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Images', [
      {
        file: "banner-1.jpg",
        sectionId: 1,
        createdAt: new Date
      },
      {
        file: "banner-2.jpg",
        sectionId: 1,
        createdAt: new Date
      },
      {
        file: "banner-3.jpg",
        sectionId: 1,
        createdAt: new Date
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('Images', null, {});

  }
};
