const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { addIncome } = require("./transaction.controllers");

router.post("/addIncome", auth, addIncome);

module.exports = router;
