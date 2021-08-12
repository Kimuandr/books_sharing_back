const Book = require('../db/book');

class BookController {
    async createBook(req, res) {
        try {
            await Book.create(req.body);
            res.json({
                "message": "book created"
            });
        } catch (err) {
            console.log(err);
        }
    }

    async getUserBooks(req, res) {
        try {
            const book = await Book.findAll({
                where: {
                    id: req.params.UserId
                }
            });
            res.send(book);
        } catch (err) {
            console.log(err);
        }

    }
}

module.exports = new BookController();