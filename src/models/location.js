'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Location extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Location.belongsTo(models.Product, {
                foreignKey: 'productId',
                targetKey: 'id',
                as: 'product'
            })

        }
    };
    Location.init({
        country: DataTypes.STRING,
        province: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        

    }, {
        sequelize,
        modelName: 'Location',
        underscored: true,
    });
    return Location;
};