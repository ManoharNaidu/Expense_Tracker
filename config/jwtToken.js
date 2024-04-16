const jwt = require("jsonwebtoken");

const createToken = async (user, status, res) => {
  const accessToken = await jwt.sign(
    {
      id: user._id,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRY }
  );
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };
  res.status(200).cookie("token", accessToken, options).json({
    status,
    user,
  });
};

module.exports = createToken;
