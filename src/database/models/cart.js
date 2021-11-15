'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.Order,{
        as : 'order'
      })
      Cart.belongsTo(models.Product,{
        as : 'product'
      })
    }
  };
  Cart.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    orderId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};