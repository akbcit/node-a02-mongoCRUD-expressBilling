"use strict"

const express = require("express");

// create a router
const clientsRouter = express.Router();

// Import Action methods from controller
const{ClientsIndex,ClientCreate,AddClient} = require("../controllers/ClientController.js");

// Define routes

// Get route for Clients Index
clientsRouter.get("/",ClientsIndex);
// Get route for displaying client create form
clientsRouter.get("/edit",ClientCreate);
// Post route for using data from form to create a new document / record
clientsRouter.post("/edit",AddClient);







// Export the router
module.exports = clientsRouter;
