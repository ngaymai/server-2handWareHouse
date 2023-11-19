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

    }
  };
  MapCategory.init({
    index: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'MapCategory',
    tableName: 'MapCategories'
  });

  MapCategory.removeAttribute('id');
  return MapCategory;
};