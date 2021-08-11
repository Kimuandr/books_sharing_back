const Router = require('express');
const router = new Router();
const bookController = require('../controllers/book.controller');

router.post('/book', bookController.createBook);
router.get('/book', bookController.getUserBooks);

module.exports = router;