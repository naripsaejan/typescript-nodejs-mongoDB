const router = require("express").Router();
const Product = require("../../models/product");

//create products
router.post("/products", async (req, res) => {
  const { body: payload } = req;

  try {
    const product = await Product.create(payload);
    res.status(201).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ error: "Validation Error", details: error.errors });
    }

    console.error("Error creating product:", error); //TODO: edit live log in file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get data by id
router.get("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error geting product:", error); //TODO: edit live log in file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//update data
router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { body: payload } = req;

  try {
    const product = await Product.findByIdAndUpdate(id, { $set: payload });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error updating product:", error); //TODO: edit live log in file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete
router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await Product.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting product:", error); //TODO: edit live log in file
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
