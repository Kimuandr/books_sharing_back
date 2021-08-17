const db = require("./db");
const { DataTypes } = require("sequelize");

const User = db.define(
	"User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING
		}
	}, {
		tableName: "users",
		timestamps: false
	}
);

module.exports = User;
