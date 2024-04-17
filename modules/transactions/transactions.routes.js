const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const {
  addIncome,
  addExpense,
  getTransactions,
} = require("./transaction.controllers");

router.get("/", auth, getTransactions);
router.post("/addIncome", auth, addIncome);
router.post("/addExpense", auth, addExpense);

module.exports = router;
