'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ShopLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {
        foreignKey: 'productId',
        targetKey: 'id',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })
    }
  };
  ShopLocation.init({
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ShopLocation',
    tableName: 'ShopLocations',    
  });

  ShopLocation.removeAttribute('id');
  return ShopLocation;
};