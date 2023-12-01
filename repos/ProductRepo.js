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

  async deleteProductById(id) {
    console.log(`deleting product by id ${id}`);
    let result = await Product.findByIdAndDelete(id);
    console.log(result);
    return result;
  }

  async updateProductById(id,productObj) {
    console.log(`updating profile by id ${id}`);
    const product = await Product.findById(id);
    console.log("original profile: ", product);
    product.name = productObj.name;
    product.code = productObj.code;
    product.unitCost = productObj.unitCost;
    let result = await product.save();
    console.log("updated profile: ", result);
    return {
      obj: result,
      errorMsg: "",
    };
  }
}



module.exports = ProductRepo;
