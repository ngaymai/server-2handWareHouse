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
        as: 'user'
      })
      
      Order.belongsTo(models.Product, {
        as: 'product'
      })

      Order.belongsTo(models.User,{
        as: 'shipper'
      })

      Order.hasOne(models.ReceivingPlace, {
        sourceKey: 'id',
        foreignKey: 'orderId',
        as: 'receivingPlace'
      })

      Order.hasOne(models.Payment, {        
        foreignKey: 'orderId',
        as: 'payment'
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
    tableName: 'Orders',
  });
  return Order;
};