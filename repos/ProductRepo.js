const Product = require("../models/Product.js");

class ProductRepo {
  ProductRepo() {}

  async getAllProducts() {
    let products = await Product.find({});
    return products;
  }

  async getProductById(id) {
    let product = await Product.find(id);
    return product;
  }
}

module.exports = ProductRepo;
