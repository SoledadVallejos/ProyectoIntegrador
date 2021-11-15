'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rol.hasMany(models.User,{
        as : 'users'
      })
    }
  };
  Rol.init({ // ESCRIBIR AQUI TODOS LOS ITEMS DE TU TABLA PARA QUE SE MUESTREN EN NAVEGDOR
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rol',
  });
  return Rol;
};