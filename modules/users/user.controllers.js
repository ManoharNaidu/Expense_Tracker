const User = require("../../models/users.model");
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
  res.json(newUser);
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
    res.json(user);
  } else {
    throw new Error("Invalid Password");
  }
};
