const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      id: user.id,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if all credentials are available
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please fill-in all information");
  }

  // validate if email address already exist
  userEmailExist = await User.findOne({
    email,
  });

  if (userEmailExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  // encrypt password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create actual user and save to database
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // validate if user was successfully created to the database
  if (!user) {
    res.status(400);
    throw new Error("Error when creating the account");
  }

  res.status(201).json({
    name,
    email,
    id: user.id,
    token: generateToken(user.id),
  });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "2d",
  });
};

const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: "Get User",
  });
});

module.exports = {
  loginUser,
  registerUser,
  getMe,
};
