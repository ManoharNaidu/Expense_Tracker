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
