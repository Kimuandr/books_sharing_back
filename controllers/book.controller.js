const BookServices = require("../services/book.services");

class BookController {
	async createBook(req, res) {
		try {
			await BookServices.createOneBook(req, res);
		} catch (err) {
			console.log(err);
		}
	}

	async getBooks(req, res) {
		try {
			await BookServices.getAllBooks(req, res);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new BookController();
