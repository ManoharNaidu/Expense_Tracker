const Transaction = require("../../models/transactions.model");
const User = require("../../models/users.model");

exports.addIncome = async (req, res) => {
  const { amount, remarks } = req.body;
  if (!amount) throw new Error("Amount is required");
  if (!remarks) throw new Error("Remarks is required");
  if (amount < 0) throw new Error("Amount cannot be negative");
  if (typeof amount !== "number") throw new Error("Amount must be a number");
  if (typeof remarks !== "string") throw new Error("Remarks must be a string");
  if (amount === 0) throw new Error("Amount cannot be zero");
  if (remarks.length < 3) throw new Error("Remarks is too short");
  if (remarks.length > 100) throw new Error("Remarks is too long");

  await Transaction.create({
    user_id: req.user._id,
    amount,
    transaction_type: "income",
    remarks,
  });

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: { balance: amount },
    },
    { runValidators: true }
  );

  res.status(201).json({
    status: "success",
    message: "Income added successfully",
  });
};

exports.addExpense = async (req, res) => {
  const { amount, remarks } = req.body;
  if (!amount) throw new Error("Amount is required");
  if (!remarks) throw new Error("Remarks is required");
  if (amount < 0) throw new Error("Amount cannot be negative");
  if (typeof amount !== "number") throw new Error("Amount must be a number");
  if (typeof remarks !== "string") throw new Error("Remarks must be a string");
  if (amount === 0) throw new Error("Amount cannot be zero");
  if (remarks.length < 3) throw new Error("Remarks is too short");
  if (remarks.length > 100) throw new Error("Remarks is too long");

  await Transaction.create({
    user_id: req.user._id,
    amount,
    transaction_type: "expense",
    remarks,
  });

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: { balance: -amount },
    },
    { runValidators: true }
  );

  res.status(201).json({
    status: "success",
    message: "Expense added successfully",
  });
};

exports.getTransactions = async (req, res) => {
  const transactions = await Transaction.find({
    user_id: req.user._id,
    ...req.query,
  });

  res.status(200).json({ transactions });
};

exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  if (!id) throw new Error("Transaction ID is required");

  const transaction = await Transaction.findById(id);
  if (!transaction) throw new Error("Transaction not found");

  await Transaction.findByIdAndDelete(id);

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: {
        balance:
          transaction.transaction_type === "income"
            ? -transaction.amount
            : transaction.amount,
      },
    },
    { runValidators: true }
  );

  res.status(200).json({
    status: "success",
    message: "Transaction deleted successfully",
  });
};

exports.updateTransaction = async (req, res) => {
  const { id } = req.params;
  const { amount, remarks } = req.body;
  if (!id) throw new Error("Transaction ID is required");
  if (!amount) throw new Error("Amount is required");
  if (!remarks) throw new Error("Remarks is required");
  if (amount < 0) throw new Error("Amount cannot be negative");
  if (typeof amount !== "number") throw new Error("Amount must be a number");
  if (typeof remarks !== "string") throw new Error("Remarks must be a string");
  if (amount === 0) throw new Error("Amount cannot be zero");
  if (remarks.length < 3) throw new Error("Remarks is too short");
  if (remarks.length > 100) throw new Error("Remarks is too long");

  const transaction = await Transaction.findById(id);
  if (!transaction) throw new Error("Transaction not found");

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $inc: {
        balance:
          transaction.transaction_type === "income"
            ? -transaction.amount
            : transaction.amount,
      },
    },
    { runValidators: true }
  );

  await Transaction.findByIdAndUpdate(
    {
      _id: id,
      user_id: req.user._id,
    },
    {
      amount,
      remarks,
    }
  );

  res.status(200).json({
    status: "success",
    message: "Transaction updated successfully",
  });
};
