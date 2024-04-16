const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  userDashboard,
} = require("./user.controllers");
const auth = require("../../middlewares/auth");

router.get("/register", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", auth, userDashboard);

module.exports = router;
