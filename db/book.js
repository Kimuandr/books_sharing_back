const db = require("./db");
const { DataTypes } = require("sequelize");

const Book = db.define(
	"Book", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		author: {
			type: DataTypes.STRING,
			allowNull: false
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {
		tableName: "books",
		timestamps: false
	}
);

module.exports = Book;
