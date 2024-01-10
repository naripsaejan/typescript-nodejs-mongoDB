const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/node-api-101", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const productsRouter = require("./routes/products");

app.use("/api/v1/", productsRouter);

const server = app.listen(process.env.PORT || 9000, () => {
  console.log("Application is running on port 9000");
});

server.on("error", (error) => {
  console.error("Express server error:", error);
});
