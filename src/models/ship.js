'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ship.belongsTo(models.User, {
        foreignKey: 'shipperId',
        targetKey: 'id',
        as: 'user'
      })

      Ship.belongsTo(models.Payment, {
        sourceKey: 'id',
        foreignKey: 'paymentId',
        as: 'payment'
      })

      Ship.belongsTo(models.Order, {
        sourceKey: 'id',
        foreignKey: 'orderId',
        as: 'order'
      })


    }
  };
  Ship.init({

  }, {
    sequelize,
    modelName: 'Ship',
    underscored: true,
  });
  return Ship;
};