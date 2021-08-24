const config = require("../config/config");
const jwt = require("jsonwebtoken");
const { ServerError, ERROR_STATUS } = require("../errors/serverErrors");

const tokenMW = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization.split(" ")[1];

		if (!authHeader) {
			return new ServerError(ERROR_STATUS.NOT_FOUND, "Just try more...");
		}

		const data = jwt.verify(authHeader, config.jwt);
		req.newUser = data;
		next();
	} catch (err) {
		res.status(404).json();
	}
};

module.exports = tokenMW;
