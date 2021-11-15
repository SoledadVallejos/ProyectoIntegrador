'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Section.hasMany(models.Product, { // REFIERE A SI MISMO
        as: 'product', // ALIAS
        foreignKey: 'sectionId' // POR LO TANTO REFIERE A SI MISMO ACA TAMBIEN
      })
      Section.belongsToMany(models.Image, { // FUNCIONA 
        as: 'image',
        through: 'section_image',
        foreignKey: 'sectionId',
        otherKey: 'imageId'
      })
    }
  };
  Section.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Section',
  });
  return Section;
};