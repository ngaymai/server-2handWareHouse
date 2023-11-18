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
        // onDelete: 'CASCADE',
        // onUpdate: 'CASCADE',
      })

    }
  };
  Image.init({
    url: DataTypes.BLOB,
    index: DataTypes.INTEGER

  }, {
    sequelize,
    modelName: 'Image',
    tableName: 'Images'
  });

  // Image.removeAttribute('id');
  return Image;
};