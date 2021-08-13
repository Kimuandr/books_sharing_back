const Book = require('../db/book');

class BookController {
    async createBook(req, res) {
        try {
            const newBook = await Book.create(req.body);
            res.json(newBook);
        } catch (err) {
            console.log(err);
        }
    }

    async getUserBooks(req, res) {
        try {
            const book = await Book.findAll({
                where: {
                    id: req.params.userId
                }
            });
            res.send(book);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new BookController();