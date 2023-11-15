'use strict';

const sequelize = require("sequelize");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MapCategories', {
            categoryId: {
                type: Sequelize.INTEGER,                
                references: {
                    model: 'categories',
                    key: 'id',
                },
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
        await queryInterface.dropTable('MapCategories');
    }
};