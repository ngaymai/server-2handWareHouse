'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Locations', {

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
            productId: {
                type: Sequelize.INTEGER,                
                references: {
                    model: 'products',
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
        await queryInterface.dropTable('Locations');
    }
};