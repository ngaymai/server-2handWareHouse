'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MapCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // MapCategory.belongsToMany(models.Product, {
            //     through: 'mapMapCategory'
            // })

        }
    };
    MapCategory.init({
        // MapCategory: DataTypes.STRING,              

    }, {
        sequelize,
        modelName: 'MapCategory',
        underscored: true,
    });
    return MapCategory;
};