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
        foreignKey: 'sellerId',
        as: 'seller',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Product.hasOne(models.ShopLocation, {
        foreignKey: 'productId',
        as: 'location',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

      Product.hasMany(models.Image, {
        sourceKey: 'id',
        foreignKey: 'productId',
        as: 'images',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

      Product.belongsToMany(models.Category, {
        through: 'MapCategory',
        foreignKey: 'productId',
        as: 'categories',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Product.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'productId',
        as: 'orders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
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
    tableName: 'Products'
  });
  return Product;
};