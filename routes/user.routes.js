const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/users", userController.getUsers);

router.post("/register", userController.registration);

router.post("/login", userController.login);

module.exports = router;
