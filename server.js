const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");

//connect db
mongoose.connect("mongodb://localhost:27017/node-api-101");

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Ahoy!" });
});

app.post("/products", async (req, res) => {
  const payload = req.body;
  try {
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const server = app.listen(9000, () => {
  console.log("Application is running on port 9000");
});

server.on("error", (error) => {
  console.error("Express server error:", error);
});
