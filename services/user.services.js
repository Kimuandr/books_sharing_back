const User = require("../db/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");

class UserServices {
	async getAllUsers() {
		const user = await User.findAll();
		return user;
	}

	async passwordHashing(pass) {
		const hashedPassword = await bcrypt.hash(pass, 10);
		return hashedPassword;
	}

	async userRegistration(req, res) {
		const { login, email, password } = req.body;

		const userAlreadyExists = await User.findOne({ where: { email } })
			.catch(err => console.log("Error", err));

		if (userAlreadyExists) {
			return res.json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await User.create({
			login: login,
			email: email,
			password: hashedPassword
		});
		console.log(newUser);
		if (newUser) {
			return res.json({ message: "Registered" });
		}
		return res.json(newUser);
	}

	async userLogin(req, res) {
		const { email, password } = req.body;
		const user = await User.findOne({ where: { email } })
			.catch(err => console.log("Error", err));
		if (!user) {
			return res.json({ message: "Email or password doesn't match" });
		}
		if (await bcrypt.compare(password, user.password)) {
			const jwtToken = jwt.sign({
				id: user.id,
				email: user.email
			}, config.jwt, { expiresIn: "2h" });
			return res.json({ message: "Welcome!", token: jwtToken });
		}
		return res.send("Try again");
	}
}

module.exports = new UserServices();
