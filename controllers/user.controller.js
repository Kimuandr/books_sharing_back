const UserService = require("../services/user.services");

class UserController {
	async registration(req, res) {
		try {
			const { name, email, password } = req.body;
			const newPerson = await UserService.createUser(name, email, password);
			res.json(newPerson);
		} catch (err) {
			console.log(err);
		}
	}

	async login(req, res) {
		try {
			const { email, password } = req.body;
			const response = await UserService.userLogin(email, password);
			res.json(response);
		} catch {
			res.status(500).send();
		}
	}

	async getUsers(req, res) {
		try {
			const user = await UserService.getAllUsers();
			res.send(user);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new UserController();
