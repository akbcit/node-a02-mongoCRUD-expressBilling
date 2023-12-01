const ProductController = require("../controllers/ProductController");

const fs = require("fs").promises;
const path = require("path");

const express = require("express");
// create a router
const productsRouter = express.Router();

// construct the path to our repos folder
const dataPath = path.join(__dirname, "../repos/");

// show all products
productsRouter.get("/", ProductController.Index);

// create before detail
productsRouter.get("/create", ProductController.Create);
productsRouter.post("/create", ProductController.CreateProduct);

// show individual product details
productsRouter.get("/:id", ProductController.Detail);

// Export the router
module.exports = productsRouter;
