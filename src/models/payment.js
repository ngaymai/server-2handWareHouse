'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here


      Payment.belongsTo(models.User, {
        foreignKey: 'senderId',
        as: 'sender',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Payment.belongsTo(models.User, {
        foreignKey: 'receiverId',
        as: 'receiver',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

      Payment.belongsTo(models.Order, {
        foreignKey: 'orderId',
        as: 'order',
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

    }
  };
  Payment.init({
    payAmount: DataTypes.DECIMAL(10, 2),
    payMethod: DataTypes.STRING,
    transactionId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Payment',
    tableName: 'Payments'
  });
  return Payment;
};