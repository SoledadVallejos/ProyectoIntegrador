'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('section_images', { // IMPORTANTE!!! EN PLURAL!
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sectionId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Sections'
          },
          key: 'id'
        }
      },
      imageId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Images'
          },
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        defaultValue: null,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('section_images');
  }
};