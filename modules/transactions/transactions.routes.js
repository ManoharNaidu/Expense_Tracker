const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const {
  addIncome,
  addExpense,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("./transaction.controllers");

router.get("/", auth, getTransactions);
router.post("/addIncome", auth, addIncome);
router.post("/addExpense", auth, addExpense);
router.patch("/updateTransaction/:id", auth, updateTransaction);
router.delete("/deleteTransaction/:id", auth, deleteTransaction);

module.exports = router;
