const express = require("express");
const router = express.Router();
const {
  checkAuthentication,
} = require("../middleware/authenticationMiddleware");

const {
  loginUser,
  registerUser,
  getMe,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", checkAuthentication, getMe);

module.exports = router;
