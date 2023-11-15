'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Image.belongsTo(models.Product, {
                foreignKey: 'productId',
                targetKey: 'id',
                as: 'product'
            })

        }
    };
    Image.init({
        url: DataTypes.BLOB,


    }, {
        sequelize,
        modelName: 'Image',
        underscored: true,
    });
    return Image;
};