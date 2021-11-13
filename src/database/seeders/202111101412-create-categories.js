'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   
      await queryInterface.bulkInsert('Categories', [
        {
        name: 'hombre',
        createdAt: new Date
       },
       {
        name: 'mujer',
        createdAt: new Date
       },
    ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
  
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};
