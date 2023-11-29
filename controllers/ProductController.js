const Product = require("../models/Product");

const ProductRepo = require("../repos/ProductRepo");

const _productRepo = new ProductRepo();

exports.Index = async function (request, response) {
  let products = await _productRepo.getAllProducts();
  if (products) {
    response.render("productsIndex", {
      title: "Express Billing - Products",
      products: products,
      contributors: ["Aditya", "Alex", "Nigel", "Tracy"],
    });
  } else {
    response.render("productsIndex", {
      title: "Express Billing - Products",
      products: [],
    });
  }
};

exports.Detail = async function (request, response) {
  const productId = request.params.id;
  let product = await _productRepo.getProductById(productId);
  let products = await _productRepo.getAllProducts();
  if (product) {
    response.render("product", {
      title: "Express Billing - " + product.name,
      products: products,
      productId: request.params.id,
      layout: "./layouts/full-width",
      contributors: ["Aditya", "Alex", "Nigel", "Tracy"],
    });
  } else {
    response.render("products", {
      title: "Express Billing - Products",
      products: [],
    });
  }
};
