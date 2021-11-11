'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Feature.belongsToMany(models.Product,{
        as : 'products',
        through : 'product_feature',
        foreignKey : 'featureId',
        otherKey : 'productId'
      })
    }
  };
  Feature.init({
    name: DataTypes.STRING,
    icon: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Feature',
  });
  return Feature;
};