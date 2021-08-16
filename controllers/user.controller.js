const User = require('../db/user');
const bcrypt = require('bcrypt');

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
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const createUser = await User.create({
                name: req.body.name,
                email: req.body.email,
                isAdmin: req.body.isAdmin,
                password: hashedPassword
            });
            res.json(createUser);
        } catch (err) {
            console.log(err);
        }
    }

    async loginUser(req, res) {
        const user = User.find(user => user.email === req.body.email);
        if (user === null) {
            return res.status(400).send("Can't find user");
        }
        try {
            if (await bcrypt.compare(req.body.password, user.password)) {
                res.send('Successfully logged in');
            } else {
                res.send('Try again');
            }
        } catch {
            res.status(500).send();
        }
    }

    async updateUser(req, res) {
        try {
            const updateUser = await User.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json(updateUser);
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