"use strict"

const express = require("express");

// create a router
const clientsRouter = express.Router();

// Import Action methods from controller
const{ClientsIndex,CreateClientForm,AddClient,ClientDetails,UpdateClientForm,UpdateClient,DeleteClient} = require("../controllers/ClientController.js");

// Define routes

// Get route for Clients Index
clientsRouter.get("/",ClientsIndex);
// Get route for displaying client create form
clientsRouter.get("/edit",CreateClientForm);
// Post route for using data from form to create a new document / record
clientsRouter.post("/edit",AddClient);
// Get route for getting a particular client's details
clientsRouter.get("/:clientId",ClientDetails);
// Get route for updating a client's details
clientsRouter.get("/:clientId/edit",UpdateClientForm);
// Post route for updating a client's details
clientsRouter.post("/:clientId/edit",UpdateClient);
// Get route for deleting a client's details
clientsRouter.get("/:clientId/delete",DeleteClient);

// Export the router
module.exports = clientsRouter;
