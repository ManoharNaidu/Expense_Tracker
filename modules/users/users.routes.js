const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  userDashboard,
  logoutUser,
} = require("./user.controllers");
const auth = require("../../middlewares/auth");

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/dashboard", auth, userDashboard);

module.exports = router;
