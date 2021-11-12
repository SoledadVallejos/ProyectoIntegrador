'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Image.belongsToMany(models.Section, {
        as: 'sections',
        through: 'section_image',
        foreignKey: 'imageId',
        otherKey: 'sectionId'
      })
      Image.belongsTo(models.Product, {
        as: 'product',
        foreignKey: 'productId'
      }),
        Image.belongsTo(models.Category, {
          as: 'category',
          foreignKey: 'categoryId'
        })
    }
  };
  Image.init({
    file: DataTypes.STRING,
    productId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};