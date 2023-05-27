const express = require("express");
const router = express.Router();

const {
  getBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const {
  checkAuthentication,
} = require("../middleware/authenticationMiddleware");

router.get("/", checkAuthentication, getBooks);
router.post("/", checkAuthentication, createBook);
router.get("/:id", checkAuthentication, getBook);
router.put("/:id", checkAuthentication, updateBook);
router.delete("/:id", checkAuthentication, deleteBook);

module.exports = router;
