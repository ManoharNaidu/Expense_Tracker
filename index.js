require("express-async-errors");
require("dotenv").config();
require("./config/db")();
const express = require("express");
const errorHandler = require("./handlers/errorHandler");

const app = express();

// Models initialization
require("./models/users.model");
require("./models/transactions.model");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Routes initialization
const userRoutes = require("./modules/users/users.routes");
app.use("/api/user", userRoutes);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
