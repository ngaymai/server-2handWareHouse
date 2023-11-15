'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Payments', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            payAmount: {
                type: Sequelize.DECIMAL(10,2)
            },
            payMethod: {
                type: Sequelize.STRING
            },           
            transactionId: {
                type: Sequelize.STRING
            },
            
            senderId: {
                type: Sequelize.INTEGER,                
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            receiverId: {
                type: Sequelize.INTEGER,
                
                references: {
                    model: 'users',
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
        await queryInterface.dropTable('Payments');
    }
};