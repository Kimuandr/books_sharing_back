const User = require('../db/user');
 

class UserController {
async getUsers(req, res) {
    try {
        const user = await User.findAll();
        res.send(user);
    } catch (err) {
        console.log(err);
    }
}
 
async getUserById(req, res) {
    try {
        const user = await User.findAll({
            where: {
                id: req.params.id
            }
        });
        res.send(user[0]);
    } catch (err) {
        console.log(err);
    }
}
 
async createUser(req, res) {
    try {
        await User.create(req.body);
        res.json({
            "message": "User Created"
        });
    } catch (err) {
        console.log(err);
    }
}
 
async updateUser(req, res) {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User updated"
        });
    } catch (err) {
        console.log(err);
    }
}
 
async deleteUser(req, res) {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({
            "message": "User deleted"
        });
    } catch (err) {
        console.log(err);
    }
}
}

module.exports = new UserController();
