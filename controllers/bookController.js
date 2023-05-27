const asyncHandler = require("express-async-handler");

const getBook = asyncHandler(async (req, res) => {
  res.status(200).json({
    procedure: "Get Book",
  });
});

const createBook = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error("Please provide author's name");
  }

  res.status(200).json({
    procedure: "Create Book",
  });
});

const updateBook = asyncHandler(async (req, res) => {
  res.status(200).json({
    procedure: `Update Book ${req.params.id}`,
  });
});

const deleteBook = asyncHandler(async (req, res) => {
  res.status(200).json({
    procedure: `Delete Book ${req.params.id}`,
  });
});

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
