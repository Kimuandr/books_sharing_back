const ErrorStatus = {
	OK: 200,
	BAD_REQUEST: 400,
	FORBIDDEN: 403,
	NOT_FOUND: 404,
	INTERNAL_SERVER: 500
};

class ServerError extends Error {
	constructor(statusCode, message) {
		super(statusCode, message);
		this.name = message;
		this.statusCode = statusCode;
	}
}

module.exports = { ServerError, ErrorStatus };
