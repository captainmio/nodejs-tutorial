if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// EXPRESS IMPLEMENTATION
const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({ limit: "10mb", extended: false }));
const cors = require("cors");
app.use(cors());
// EXPRESS IMPLEMENTATION

// code that connects nodejs to mongoDB using mongoose
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.error("Connected to Mongoose"));
// code that connects nodejs to mongoDB using mongoose

// ROUTES
app.use("/api/books", require("./routes/booksRoute"));
app.use("/api/users", require("./routes/usersRoute"));
// ROUTES

app.use(errorHandler);

app.listen(process.env.PORT || 3001);
