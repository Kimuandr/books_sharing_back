const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");

router.post("/books", bookController.createBook);
router.get("/books", bookController.getBooks);

module.exports = router;
