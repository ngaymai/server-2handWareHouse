'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ships', {

            orderId: {
                type: Sequelize.INTEGER,

                references: {
                    model: 'orders',
                    key: 'id',
                },
            },
            shipperId: {
                type: Sequelize.INTEGER,

                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            payId: {
                type: Sequelize.INTEGER,

                references: {
                    model: 'payments',
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