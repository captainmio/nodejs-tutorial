const asyncHandler = require("express-async-handler");
const Book = require("../models/book");

const getBooks = asyncHandler(async (req, res) => {
  const book = await Book.find({ user: req.user.id });

  res.status(200).json(book);
});

const getBook = asyncHandler(async (req, res) => {
  const book = await Book.find({ _id: req.params.id });

  res.status(200).json(book);
});

const createBook = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide author's name");
  }

  const book = await Book.create({
    name: req.body.name,
    description: req.body.description,
    user: req.user.id,
  });

  res.status(200).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide author's name");
  }

  const book = await Book.find({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!book || book.length <= 0) {
    res.status(400);
    throw new Error("Book not found");
  }

  const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBook);
});

const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.find({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!book || book.length <= 0) {
    res.status(400);
    throw new Error("Book not found");
  }

  await Book.deleteOne({
    _id: req.params.id,
  });

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getBook,
  getBooks,
  createBook,
  updateBook,
  deleteBook,
};
