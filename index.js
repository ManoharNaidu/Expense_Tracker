require("express-async-errors");
require("dotenv").config();
require("./config/db")();
const express = require("express");
const errorHandler = require("./handlers/errorHandler");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
