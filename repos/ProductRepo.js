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

  async createProduct(productObj) {
    try {
      const error = await productObj.validateSync();
      if (error) {
        const response = {
          obj: productObj,
          errorMsg: error.message,
        };
        return response;
      }

      const result = await productObj.save();
      const response = {
        obj: result,
        errorMsg: "",
      };
      return response;
    } catch (error) {
      const response = {
        obj: productObj,
        errorMsg: error.message,
      };
      return response;
    }
  }
}

module.exports = ProductRepo;
