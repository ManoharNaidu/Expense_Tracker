const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  userDashboard,
  logoutUser,
  forgotPassword,
  resetPassword,
} = require("./user.controllers");
const auth = require("../../middlewares/auth");

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", resetPassword);
router.get("/dashboard", auth, userDashboard);

module.exports = router;
