const Product = require("../models/Product");

const ProductRepo = require("../repos/ProductRepo");

const _productRepo = new ProductRepo();

// Import packageReader and get contributors
const packageReader = require("../packageReader");
const contributors = packageReader.getContributors();

exports.Index = async function (request, response) {
  let products = await _productRepo.getAllProducts();
  // check for any query parameters
  const { searchedName } = request.query;
  // if there is a query parameter
  if (searchedName) {
    console.log("fetching data for search term from controller");
    // get results for this search param from repo
    products = await _productRepo.getProductsbyName(searchedName);
  } else {
    console.log("fetching all clients data from controller");
    // get all clients from repo
    products = await _productRepo.getAllProducts();
  }
  if (products) {
    response.render("productsIndex", {
      title: "Express Billing - Products",
      products: products,
      contributors: contributors,
    });
  } else {
    response.render("productsIndex", {
      title: "Express Billing - Products",
      products: [],
      contributors: contributors,
    });
  }
};

exports.Detail = async function (request, response) {
  const productId = request.params.id;
  let product = await _productRepo.getProductById(productId);
  let products = await _productRepo.getAllProducts();
  if (product) {
    response.render("productDetails", {
      title: "Express Billing - " + product.name,
      products: products,
      productId: request.params.id,
      layout: "./layouts/full-width",
      contributors: contributors,
    });
  } else {
    console.log(`product ${request.params.id}'s record not found!`);
    // render client details page and send this client doc object
    response.render("404", {
      title: `Express Billing Page Not Found`,
      contributors: contributors,
    });
  }
};

// Handle profile form GET request
exports.Create = async function (request, response) {
  response.render("productCreate", {
    title: "Create Product",
    errorMessage: "",
    product_id: null,
    product: {},
    contributors: contributors,
  });
};

// Handle profile form GET request
exports.CreateProduct = async function (request, response) {
  // instantiate a new Profile Object populated with form data
  let tempProductObj = new Product({
    name: request.body.name,
    code: request.body.code,
    unitCost: request.body.unitCost,
  });

  let responseObj = await _productRepo.createProduct(tempProductObj);

  if (responseObj.errorMsg == "") {
    console.log(responseObj.obj);
    response.redirect("/products/" + responseObj.obj._id); // Redirect to the product detail page
  } else {
    console.log("An error occurred. Item not created.");
    response.render("productCreate", {
      title: "Create Product",
      product: responseObj.obj,
      contributors: contributors,
      errorMessage: responseObj.errorMsg,
    });
  }
};

// Handle profile form GET request
exports.DeleteProductById = async function (request, response) {
  const productId = request.params.id;
  let deletedProduct = await _productRepo.deleteProductById(productId);
  let products = await _productRepo.getAllProducts();

  if (deletedProduct) {
    response.redirect("/products");
  } else {
    response.render("productsIndex", {
      title: "Express Billing - Products",
      products: products,
      errorMessage: "Error.  Unable to Delete",
      contributors: contributors,
    });
  }
};


// Handle edit profile form GET request
exports.Edit = async function (request, response) {
  const productId = request.params.id;
  let product = await _productRepo.getProductById(productId);
  response.render("productForm", {
    title: "Express Billing - " + product.name,
    errorMessage: "",
    productId: request.params.id,
    products: product,
    layout: "./layouts/full-width",
    contributors: contributors,
  });
};

// Handle profile edit form submission
exports.EditProduct = async function (request, response) {
  const productId = request.body.productId;

  let tempProductObj = new Product({
    name: request.body.name,
    code: request.body.code,
    unitCost: request.body.unitCost,
  });

  // send these to profileOps to update and save the document
  let responseObj = await _productRepo.updateProductById(productId, tempProductObj);

  // if no errors, save was successful
  if (responseObj.errorMsg == "") {
    response.redirect("/products/" + responseObj.obj._id); // Redirect to the product detail page
  }
  // There are errors. Show form the again with an error message.
  else {
    console.log("An error occured. Item not created.");
    let product = await _productRepo.getProductById(productId);
    response.render("productForm", {
      title: "Express Billing - " + product.name,
      productId: request.params.id,
      products: product,
      layout: "./layouts/full-width",
      contributors: contributors,
      errorMessage: responseObj.errorMsg,
    });
  }
};