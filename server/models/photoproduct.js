'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photoProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  photoProduct.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    idproduct: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'photoProduct',
  });
  return photoProduct;
};