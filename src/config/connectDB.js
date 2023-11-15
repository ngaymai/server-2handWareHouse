const { Sequelize } = require('sequelize');


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('bouqa5foi1fh2meaxnzq', 'uylrtcg8gtr3lk0l', 'ZC6HGeaQU3jpmL9BsBbb', {
    host: 'bouqa5foi1fh2meaxnzq-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    // loggin don't log execute in terminal
    logging: false
    /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectDB;