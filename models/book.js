const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please author's name"],
  },
  description: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Book", bookSchema);
