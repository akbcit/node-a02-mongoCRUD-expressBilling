const mongoose = require("mongoose");

// import client model
const Client = require("../models/Client");

class ClientRepo {
  // empty constructor
  ClientRepo() {}

  // CRUD methods for interacting with DB

  // method for getting all clients
  async getAllClients() {
    console.log("getting all clients from Database");
    const clients = await Client.find({}).sort({ name: 1 });
    return clients;
  }

  // method for getting one client by id
  async getClientById(id) {
    console.log(`getting client ${id} from Database`);
    const client = await Client.findById(id);
    return client;
  }

  // method for creating a new client
  async createClient(newClient) {
    try {
      // create a document using newClient object
      const newClientDoc = await Client.create(newClient);
      // check if the doc adheres to schema
      const error = await newClientDoc.validate();
      // if error quit and send error as response
      if (error) {
        console.error("Validation failed:", error);
        return error.message;
      }
      // else save document
      console.log("saving client record");
      await newClientDoc.save();
      // return empty string
      return "";
    } catch (error) {
      // display error and return with error message
      console.error("Error creating client:", error);
      return error.message;
    }
  }

  // method for updating a client
  async updateClient() {}

  // method for deleting a client
  async deleteClients() {}
}

module.exports = ClientRepo;
