const express = require("express");
const router = express.Router();

const {
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.get("/books", getBook);
router.post("/books", createBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);

module.exports = router;
