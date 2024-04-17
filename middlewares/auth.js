const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const accessToken = req.headers.Cookie.split("=")[1];
  if (!accessToken) {
    throw new Error("accessToken is required");
  }
  const user = jwt.verify(accessToken, process.env.JWT_SECRET);
  if (!user) {
    throw new Error("Invalid token");
  }
  req.user = user;
  next();
};

module.exports = auth;
