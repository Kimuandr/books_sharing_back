const UserService = require("../services/user.services");

class UserController {
	async registration(req, res) {
		try {
			const newPerson = await UserService.createUser({ ...req.body });
			res.json(newPerson);
		} catch (err) {
			res.status(500).send();
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
			res.status(500).send();
		}
	}
}

module.exports = new UserController();
