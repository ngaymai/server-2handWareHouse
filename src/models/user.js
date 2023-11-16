'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Product, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'products'
      })
      User.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'orders',
      })

      User.hasMany(models.Ship, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'ships',
      })
      // User.belongsToMany(models.Payment, {
      //   through: 'Receiver'
      //   // sourceKey: 'id',
      //   // foreignKey: 'receiverId',
      //   // as: 'receivers',
      // })
      // User.belongsToMany(models.Payment, {
      //   through: 'Sender'
      //   // sourceKey: 'id',
      //   // foreignKey: 'senderId',
      //   // as: 'senders',
      // })
    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    // gender: DataTypes.BOOLEAN,
    image: DataTypes.BLOB,
    roleId: DataTypes.STRING,
    // positionId: DataTypes.STRING

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};