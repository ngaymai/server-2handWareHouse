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
      Product.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        
      })

      Product.hasOne(models.ShopLocation, {
        sourceKey: 'id',
        foreignKey: 'productId',
        
      })

      Product.hasMany(models.Image, {
        sourceKey: 'id',
        foreignKey: 'productId',
        
      })

      Product.belongsToMany(models.Category, {
        through: 'mapCategory'
      })

      Product.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'productId',
        
      })


    }
  };
  Product.init({
    prodName: DataTypes.STRING,
    prodQuantity: DataTypes.INTEGER,
    prodDesc: DataTypes.TEXT,
    prodAskPrice: DataTypes.DECIMAL(10, 2),
    prodPhone: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Product',
    underscored: true,
  });
  return Product;
};