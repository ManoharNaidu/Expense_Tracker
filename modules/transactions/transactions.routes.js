const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const { addIncome, addExpense } = require("./transaction.controllers");

router.post("/addIncome", auth, addIncome);
router.post("/addExpense", auth, addExpense);

module.exports = router;
