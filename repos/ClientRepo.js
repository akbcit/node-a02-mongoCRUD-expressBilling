const mongoose = require("mongoose");

// import client model
const Client = require("../models/Client");

class ClientRepo {
  // empty constructor
  ClientRepo() {}

  // CRUD methods for interacting with DB

  // method for getting all clients
  async getAllClients() {
    try {
      console.log("getting all clients from Database");
      const clients = await Client.find({}).sort({ name: 1 });
      return clients;
    } catch (error) {
      return [];
    }
  }

  // method for getting one client by id
  async getClientById(id) {
    try {
      console.log(`getting client ${id} from Database`);
      const client = await Client.findById(id);
      return client;
    } catch (error) {
      return false;
    }
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
        console.error("error while validating", error);
        return error.message;
      }
      // else save document
      console.log("saving client record");
      await newClientDoc.save();
      // return id of new client
      return newClientDoc._id.toString();
    } catch (error) {
      // display error and return with error message
      console.error("error creating client:", error);
      return error.message;
    }
  }

  // method for updating a client
  async updateClient(updatedClient) {
    const clientId = updatedClient.id;

    try {
      console.log(`getting client ${clientId} from Database`);
      const clientDoc = await this.getClientById(clientId);
      console.log(clientDoc);
      if (!clientDoc) {
        // if client does not exist send back false
        console.error("error in retrieving client");
        return false;
      }
      // if client exists update the client doc and save
      console.log(`updating doc: ${clientDoc._id}`);
      // save only relevant fields
      Object.assign(clientDoc, updatedClient);
      // saving client doc
      console.log("saving clientDoc");
      await clientDoc.save();
      // return true
      return true;
    } catch (error) {
      console.error("error updating client:", error.message);
      return false;
    }
  }

  // method for deleting a client
  async deleteClient(id) {
    try{
      console.log(`deleting client ${id}`);
      const deletedClient = await Client.findByIdAndDelete(id);
      console.log(`deleted client ${id}!`);
      return `Client ${deletedClient.name} deleted successfully!`;
    }
    catch(error){
      console.error("Error while deleting:",error.message);
      return false;
    }
  }
}

module.exports = ClientRepo;
