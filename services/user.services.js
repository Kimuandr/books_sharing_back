const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { ServerError, ERROR_STATUS } = require("../errors/serverErrors");
const uuid = require("uuid");
const Token = require("../db/token");

class UserService {
	async getAllUsers() {
		return User.findAll();
	}

	async hashedData(data) {
		return bcrypt.hash(data, 10);
	}

	async jwtAdd(id, email) {
		const accessJwt = jwt.sign({ id, email }, config.jwt, { expiresIn: config.jwtExpire });
		const refreshJwt = jwt.sign({ id, email }, config.refJwt, { expiresIn: config.refJwtExpire });
		return { accessJwt, refreshJwt };
	}

	async createJwtTable(id, refreshJwt) {
		const jwtData = await Token.findOne({ where: { id } });
		if (jwtData) {
			jwtData.refreshJwt = refreshJwt;
			return jwtData.save();
		}
		const newJwt = await Token.create({ userId: id, refreshJwt: refreshJwt });
		return newJwt;
	}

	async createUser({ name, email, password }) {
		const userAlreadyExists = await User.findOne({ where: { email } });

		if (userAlreadyExists) {
			return new ServerError(ERROR_STATUS.FORBIDDEN, "Something went wrong! Try again!");
		}

		const activationLink = uuid.v4();

		const newUser = await User.create({
			name: name,
			email: email,
			password: await this.hashedData(password),
			activationLink: activationLink
		});

		const tokens = await this.jwtAdd(newUser.id, email);

		await this.createJwtTable(newUser.id, tokens.refreshJwt);

		return { ...tokens, newUser };
	}

	async userLogin(email, password) {
		if (!password || !email) {
			return new ServerError(ERROR_STATUS.NOT_FOUND, "Try to enter your data again");
		}
		const user = await User.findOne({ where: { email } });
		if (!user) {
			return new ServerError(ERROR_STATUS.NOT_FOUND, "Something went wrong");
		}
		const comparePasswordResult = await bcrypt.compare(password, user.password);

		if (comparePasswordResult) {
			const tokens = await this.jwtAdd(user.id, user.email);
			await this.createJwtTable(user.id, tokens.refreshJwt);
			return { email, ...tokens };
		}
		return new ServerError(ERROR_STATUS.INTERNAL_SERVER, "Start from the beginning");
	}

	async exit(refreshJwt) {
		const delJwt = await Token.findOne({ where: { refreshJwt } });
		await delJwt.destroy();
		return { deletedRefreshToken: delJwt.refreshJwt };
	}
}

module.exports = new UserService();
