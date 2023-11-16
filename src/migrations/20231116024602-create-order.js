'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prodNameuserProposedPrice: {
        type: Sequelize.DECIMAL(10, 2)
      },
      purQuantity: {
        type: Sequelize.INTEGER
      },
      purShippingFee: {
        type: Sequelize.DECIMAL(10, 2)
      },
      status: {
        type: Sequelize.STRING
      },
      userId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Users',
          key: 'id',
        },
      },
      productId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Products',
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
    await queryInterface.dropTable('Orders');
  }
};