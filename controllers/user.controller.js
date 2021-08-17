const UserServices = require("../services/user.services");

class UserController {
	async registration(req, res) {
		try {
			await UserServices.userRegistration(req, res);
		} catch (err) {
			console.log(err);
		}
	}

	async login(req, res) {
		try {
			await UserServices.userLogin(req, res);
		} catch {
			res.status(500).send();
		}
	}

	async getUsers(req, res) {
		try {
			const user = await UserServices.getAllUsers();
			res.send(user);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new UserController();
