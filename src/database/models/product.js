'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Image, {
        as: 'images',
        onDelete: 'cascade',
        foreignKey: 'productId' // TIENE MUCHOS... REFIERE A SI MISMO (productId)
      })
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId' // PERTENECE A... REFIERE A OTRO (categoryId)
      })
      Product.belongsTo(models.Section, {
        as: 'section',
        foreignKey: 'sectionId' // PERTENECE A... REFIERE A OTRO (sectionId)
      })
    }
  };
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    description: DataTypes.STRING,
    discount: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};