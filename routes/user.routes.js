const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authToken = require("../middlewares/tokenMW");

router.get("/users", authToken, userController.getUsers);

router.post("/register", body("password").isLength({ min: 6, max: 12 }), userController.registration);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

module.exports = router;
