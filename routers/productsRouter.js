const express = require("express");
const ProductController = require("../controllers/ProductController");

// create a router
const productsRouter = express.Router();

// show all products
productsRouter.get("/", ProductController.Index);

// show individual product details
productsRouter.get("/:id", ProductController.Detail);

// Export the router
module.exports = productsRouter;
