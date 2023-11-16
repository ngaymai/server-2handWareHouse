'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
        
      })

      Order.belongsTo(models.Product, {
        sourceKey: 'id',
        foreignKey: 'productId',
        
      })

      Order.hasOne(models.ReceivingPlace, {
        sourceKey: 'id',
        foreignKey: 'orderId',
        
      })

      Order.hasOne(models.Ship, {
        sourceKey: 'id',
        foreignKey: 'orderId',
        
      })



    }
  };
  Order.init({
    userProposedPrice: DataTypes.DECIMAL(10, 2),
    purQuantity: DataTypes.INTEGER,
    purShippingFee: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Order',
    underscored: true,
  });
  return Order;
};