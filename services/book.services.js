const Book = require("../db/book");

class BookService {
	async createOneBook(author, title) {
		const newBook = await Book.create({ author, title });
		return newBook;
	}

	async getAllBooks() {
		const book = await Book.findAll();
		return book;
	}
}

module.exports = new BookService();
