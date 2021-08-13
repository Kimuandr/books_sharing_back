const db = require('./db');
const {
    DataTypes
} = require('sequelize');

const User = db.define(
    "User", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
        }
    }, {
        tableName: "users",
        timestamps: false,
    }
)

module.exports = User;