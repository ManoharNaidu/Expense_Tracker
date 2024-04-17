const User = require("../../models/users.model");
const Transaction = require("../../models/transactions.model");
const createToken = require("../../config/jwtToken");
const mailTrap = require("../../config/mailTrap");
const nodemail = require("../../config/nodemail");
const bcrypt = require("bcryptjs");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name) throw new Error("Name is required");
  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters");

  const getDuplicateEmail = await User.findOne({ email });
  if (getDuplicateEmail) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  // mailTrap(newUser.email, newUser.name);
  nodemail(newUser.email, newUser.name);
  createToken(newUser, "User created successfuly", res);
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) throw new Error("Email is required");
  if (!password) throw new Error("Password is required");

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }
  if (await bcrypt.compare(password, user.password)) {
    createToken(user, "Logged in successfully", res);
  } else {
    throw new Error("Invalid Password");
  }
};

exports.logoutUser = async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged out successfully" });
};

exports.userDashboard = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  const transactions = await Transaction.find({ user_id: req.user._id }); // can add sort("+/-createdAt") and limit(number)
  res.status(200).json({ user, transactions });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Email is required");

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }
  const resetCode = Math.floor(10000 + Math.random() * 90000);
  await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      reset_code: resetCode,
    }
  );
  nodemail(user.email, user.name, resetCode);
  res.json({
    message: "Password reset link sent to your email",
  });
};

exports.resetPassword = async (req, res) => {
  const { email, reset_code, new_password } = req.body;
  if (!email) throw new Error("Email is required");
  if (!reset_code) throw new Error("Reset code is required");
  if (!new_password) throw new Error("New password is required");

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid Email");
  }
  if (user.reset_code !== reset_code) {
    throw new Error("Invalid reset code");
  }
  const hashedPassword = await bcrypt.hash(new_password, 12);
  await User.findByIdAndUpdate(
    {
      _id: user._id,
    },
    {
      password: hashedPassword,
      reset_code: null,
    },
    {
      runValidators: true,
    }
  );
  res.json({
    message: "Password reset successful",
  });
};
