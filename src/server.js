const express = require("express");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");

//connect db
mongoose.connect(process.env.PORT_DB + "/node-api-101");
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

const usersRouter = require("./routes/users");
const productsRouter = require("./routes/products");

app.use("/api/v1/", usersRouter, productsRouter);

const server = app.listen(process.env.PORT || 9000, () => {
  console.log("Application is running on port 9000");
});

server.on("error", (error) => {
  console.error("Express server error:", error);
});
