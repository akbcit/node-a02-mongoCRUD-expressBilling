const Product = require("../models/Product.js");

class ProductRepo {
  ProductRepo() {}

  async getAllProducts() {
    let products = await Product.find({});
    return products;
  }

  async getProductById(productId) {
    let product = await Product.findById(productId);
    return product;
  }
}

module.exports = ProductRepo;
