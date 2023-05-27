const getBook = (req, res) => {
  res.status(200).json({
    procedure: "Get Book",
  });
};

const createBook = (req, res) => {
  res.status(200).json({
    procedure: "Create Book",
  });
};

const updateBook = (req, res) => {
  res.status(200).json({
    procedure: `Update Book ${req.params.id}`,
  });
};

const deleteBook = (req, res) => {
  res.status(200).json({
    procedure: `Delete Book ${req.params.id}`,
  });
};

module.exports = {
  getBook,
  createBook,
  updateBook,
  deleteBook,
};
