const express = require("express");

// create a router
const indexRouter = express.Router();
// Import package and get contributors
const packageReader = require('../packageReader');
const contributors = packageReader.getContributors();

// define base route
indexRouter.get("/",(req,res)=>{
    res.status(200).render("home",{title:"Express Billing - Home Page",contributors});
});

// Rest of the code to follow...

// Export the router
module.exports = indexRouter;