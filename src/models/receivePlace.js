'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ReceivePlace extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ReceivePlace.belongsTo(models.Order, {
                foreignKey: 'orderId',
                targetKey: 'id',
                as: 'order'
            })

        }
    };
    ReceivePlace.init({
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'ReceivePlace',
        underscored: true,
    });
    return ReceivePlace;
};