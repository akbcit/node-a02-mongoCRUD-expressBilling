const mongoose = require("mongoose");

const clientSchema = mongoose.Schema(
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
  { collection: "profiles" }
);

// export the model
module.exports = Product;
