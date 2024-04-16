const User = require("../../models/users.model");
const createToken = require("../../config/jwtToken");
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

exports.userDashboard = async (req, res) => {
  const user = await User.findOnebyId(req.user.id);
  res.status(200).json({ user });
};