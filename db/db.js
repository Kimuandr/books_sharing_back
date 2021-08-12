require('dotenv').config();


const Sequelize = require('sequelize');

const db = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    define: {
        freeTableName: true,
    }
});

module.exports = db;