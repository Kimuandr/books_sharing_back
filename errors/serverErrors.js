class ServerError extends Error {
	constructor(error) {
		super();
		this.message = error;
	}

	static request(error) {
		return new ServerError(error);
	}
}
module.exports = ServerError;
