const BookService = require("../services/book.services");

class BookController {
	async createBook(req, res) {
		try {
			const { author, title } = req.body;
			const newBook = await BookService.createOneBook(author, title);
			res.send(newBook);
		} catch (err) {
			console.log(err);
		}
	}

	async getBooks(req, res) {
		try {
			const books = await BookService.getAllBooks();
			res.send(books);
		} catch (err) {
			console.log(err);
		}
	}
}

module.exports = new BookController();
