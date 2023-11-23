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
        foreignKey: 'buyerId',
        as: 'buyer',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Order.belongsTo(models.Product, {
        foreignKey: 'productId',
        as: 'product',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Order.belongsTo(models.User, {
        foreignKey: 'shipperId',
        as: 'shipper',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Order.hasOne(models.ReceivingPlace, {
        sourceKey: 'id',
        foreignKey: 'orderId',
        as: 'receivingPlace',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })

      Order.hasOne(models.Payment, {
        foreignKey: 'orderId',
        as: 'payment',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      })
    }
  };
  Order.init({
    userProposedPrice: DataTypes.DECIMAL(10, 2),
    purQuantity: DataTypes.INTEGER,
    purShippingFee: DataTypes.DECIMAL(10, 2),
    status: DataTypes.STRING,
    shipMethod: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
  });
  return Order;
};