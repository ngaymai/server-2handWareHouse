'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ships', {

      orderId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Orders',
          key: 'id',
        },
      },
      shipperId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Users',
          key: 'id',
        },
      },
      payId: {
        type: Sequelize.INTEGER,

        references: {
          model: 'Payments',
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
    await queryInterface.dropTable('Ships');
  }
};