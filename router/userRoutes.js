const express = require("express");
const {
  register,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/usercontroller");
const userRoutes = express.Router();

userRoutes.route("/register").post(register);
userRoutes.route("/login").post(login);
// userRoutes.route("/forgotpassword").post(forgotPassword);
// userRoutes.route("/resetPassword/:token").patch(resetPassword);

module.exports = userRoutes;
