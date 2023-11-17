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
        as: 'sender'
      })

      Payment.belongsTo(models.User, {
        as: 'receiver'
      })

      Payment.belongsTo(models.Order, {
        as: 'order'
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