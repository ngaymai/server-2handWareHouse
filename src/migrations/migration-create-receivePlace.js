'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ReceivePlaces', {

            country: {
                type: Sequelize.STRING
            },
            province: {
                type: Sequelize.STRING
            },
            city: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },            
            orderId: {
                type: Sequelize.INTEGER,                
                references: {
                    model: 'orders',
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
        await queryInterface.dropTable('ReceivePlaces');
    }
};