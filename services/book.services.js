const Book = require("../db/book");

class BookServices {
	async createOneBook(req, res) {
		const newBook = await Book.create(req.body);
		return res.json(newBook);
	}

	async getAllBooks(req, res) {
		const book = await Book.findAll();
		return res.send(book);
	}
}

module.exports = new BookServices();
