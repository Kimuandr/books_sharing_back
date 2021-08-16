const Book = require("../db/book");

class BookController {
  async createBook(req, res) {
    try {
      const newBook = await Book.create(req.body);
      res.json(newBook);
    } catch (err) {
      console.log(err);
    }
  }

  async getBooks(req, res) {
    try {
      const book = await Book.findAll();
      res.send(book);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new BookController();
