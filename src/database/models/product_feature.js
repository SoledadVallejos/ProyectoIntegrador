'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product_feature extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  product_feature.init({
    productId: DataTypes.INTEGER,
    featureId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product_feature',
  });
  return product_feature;
};