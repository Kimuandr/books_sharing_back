const Book = require("../db/book");

class BookService {
	async createOneBook(author, title) {
		return Book.create({ author, title });
	}

	getAllBooks() {
		return Book.findAll();
	}
}

module.exports = new BookService();
