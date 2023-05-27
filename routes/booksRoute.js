const express = require("express");
const router = express.Router();

const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/books", getBooks);
router.post("/books", createBook);
router.get("/books/:id", getBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
