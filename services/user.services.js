const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ServerError, ErrorStatus } = require("../errors/serverErrors");

class UserService {
	async getAllUsers() {
		const users = await User.findAll();
		return users;
	}

	async hashedData(data) {
		const dataHashed = await bcrypt.hash(data, 10);
		return dataHashed;
	}

	async createUser({ name, email, password }) {
		const userAlreadyExists = await User.findOne({ where: { email } });

		if (userAlreadyExists) {
			return new ServerError(ErrorStatus.FORBIDDEN, "Something went wrong! Try again!");
		}
		const newUser = await User.create({
			name: name,
			email: email,
			password: await this.hashedData(password)
		});
		return newUser;
	}

	async jwtAdding(id, email) {
		return jwt.sign({ id, email }, config.jwt, { expiresIn: config.jwtExpire });
	}

	async userLogin(email, password) {
		try {
			if (!password || !email) {
				return new ServerError(ErrorStatus.NOT_FOUND, "Try to enter your data again");
			}
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return new ServerError(ErrorStatus.NOT_FOUND, "Something went wrong");
			}
			const comparePasswordResult = await bcrypt.compare(password, user.password);
			if (comparePasswordResult) {
				const token = await this.jwtAdding(user.id, user.email);
				return { user, token };
			}
			return new ServerError(ErrorStatus.INTERNAL_SERVER, "Start from the beginning");
		} catch (err) {
			console.log("Error", err);
		}
	}
}

module.exports = new UserService();
