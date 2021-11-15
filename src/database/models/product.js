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
      Product.belongsTo(models.Section, {
        as: 'section', // TAL CUAL DEBE INCLUIRSE EN COMO include: [sections, ...]
        foreignKey: 'sectionId' // PERTENECE A... REFIERE A OTRO (sectionId)
      }),
        Product.hasMany(models.Image, {
          as: 'image',
          onDelete: 'cascade',
          foreignKey: 'productId' // TIENE MUCHOS... REFIERE A SI MISMO (productId)
        })
      Product.hasMany(models.Cart, {
        as: 'cart',
        onDelete: 'cascade',
        foreignKey: 'productId' // TIENE MUCHOS... REFIERE A SI MISMO (productId)
      })
      Product.belongsTo(models.Category, {
        as: 'category',
        foreignKey: 'categoryId' // PERTENECE A... REFIERE A OTRO (categoryId)
      })
      Product.belongsToMany(models.Feature, {
        as: 'feature',
        through: 'product_feature',
        foreignKey: 'productId',
        otherKey: 'featureId'
      })
    }
  };
  Product.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    size: DataTypes.STRING,
    color: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    discount: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    sectionId: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};