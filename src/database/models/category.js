'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.hasMany(models.Product, {
        as: 'product',
        foreignKey: 'categoryId'
      }),
        Category.hasMany(models.Image, {
          as: 'image',
          foreignKey: 'categoryId'
        })
    }
  };
  Category.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};