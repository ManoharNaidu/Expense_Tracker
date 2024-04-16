const express = require("express");

const router = express.Router();

const { registerUser, loginUser } = require("./user.controllers");

router.get("/register", registerUser);
router.post("/login", registerUser);

module.exports = router;
