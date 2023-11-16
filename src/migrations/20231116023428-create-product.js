'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodName: {
        type: Sequelize.STRING
      },
      prodQuantity: {
        type: Sequelize.INTEGER
      },
      prodDesc: {
        type: Sequelize.TEXT
      },
      prodAskPrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      prodPhone: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};