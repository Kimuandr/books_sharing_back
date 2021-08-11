const db = require('../db/db');

class BookController {
async createBook(req, res) {
    const {title, content, userId} = req.body;
    const newBook = await db.query('INSERT INTO book (title, content, user_id) values ($1, $2, $3) RETURNING *', [title, content, userId]);
    res.json(newBook.rows[0]);
}

async getUserBooks(req, res) {
const id = req.query.id;
const books = await db.query('select * from book where user_id = $1', [id]);
res.json(books.rows);
}
}

module.exports = new BookController();