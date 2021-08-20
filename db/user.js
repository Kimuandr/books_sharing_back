const db = require("./db");
const { DataTypes } = require("sequelize");
const Book = require("./book");

const User = db.define(
	"User", {
		id: {
			type: DataTypes.UUID,
			primaryKey: true,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
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
		tableName: "user",
		timestamps: false
	}
);

User.belongsToMany(Book, {
	through: "UserBooks",
	timestamps: false
});

Book.belongsToMany(User, {
	through: "UserBooks",
	timestamps: false
});

module.exports = User;
