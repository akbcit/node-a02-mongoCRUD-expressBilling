const mongoose = require("mongoose");

// create a schema
const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    companyName: String,
    email: {
      type: String,
      required: true,
    },
  },
  { collection: "profiles" }
);

// create a model
const Client = mongoose.model("Client", clientSchema);

// export the model
module.exports = Client;