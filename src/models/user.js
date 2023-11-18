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
      User.hasMany(sequelize.define('Product'), {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      User.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'orders',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })

      User.hasMany(models.Order, {
        sourceKey: 'id',
        foreignKey: 'shipperId',
        as: 'ships',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      User.hasMany(models.Payment, {
        sourceKey: 'id',
        foreignKey: 'receiverId',
        as: 'payReceivings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
      User.hasMany(models.Payment, {
        sourceKey: 'id',
        foreignKey: 'senderId',
        as: 'paySendings',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE'
      })
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
    tableName: 'Users'
  });
  return User;
};