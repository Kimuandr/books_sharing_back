const db = require("./db");
const { DataTypes } = require("sequelize");

const Token = db.define(
	"Token", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		refreshJwt: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: "token",
		timestamps: false
	}
);

module.exports = Token;
