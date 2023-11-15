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


            Payment.hasOne(models.Ship, {
                sourceKey: 'id',
                foreignKey: 'paymentId',
                as: 'ship'
            })

            Payment.belongsToMany(models.User, {
                sourceKey: 'id',
                foreignKey: 'senderId',
                as: 'sender'
            })

            Payment.belongsToMany(models.User, {
                sourceKey: 'id',
                foreignKey: 'receiverId',
                as: 'receiver'
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
        underscored: true,
    });
    return Payment;
};