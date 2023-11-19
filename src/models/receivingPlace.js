'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReceivingPlace extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Order, {     
        foreignKey: 'orderId',   
        as: 'order',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })
    }
  };
  ReceivingPlace.init({
    country: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'ReceivingPlace',
    tableName: 'ReceivingPlaces'
  });
  ReceivingPlace.removeAttribute('id');
  return ReceivingPlace;
};