const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    unitCost: {
      type: mongoose.Schema.Types.Decimal128,
      required: true,
    },
  },
  { collection: "products" }
);

const Product = mongoose.model("Product", productSchema);

// export the model
module.exports = Product;
