const Client = require("../models/Client");
// import the respository class
const ClientRepo = require("../repos/ClientRepo");

// Import packageReader and get contributors
const packageReader = require("../packageReader");
const contributors = packageReader.getContributors();

// initialise an instance of the class
const _clientRepo = new ClientRepo();

// Get method for Clients Home
exports.ClientsIndex = async (req, res) => {
  console.log("fetching data from controller");
  // get clients from repo
  const clients = await _clientRepo.getAllClients();
  // render the Clients Index page
  res.status(200).render("clientsIndex", {
    title: "Express Billing Clients Home",
    contributors: contributors,
    clients: clients ? clients : [],
  });
};

// Get Method for Client Create Form
exports.ClientCreate = (req, res) => {
  res.render("clientCreate", {
    title: "Express Billing Create Client",
    contributors: contributors,
    newClient: {},
    message: "",
  });
};

// Post Method for Client Create Form
exports.AddClient = async (req, res) => {
  // get client data from form and create an object
  const newClient = {
    name: req.body.clientName,
    code: req.body.clientCode,
    company: req.body.clientCompany,
    email: req.body.clientEmail,
  };
  // send this data to repository to add a new client
  const response = await _clientRepo.createClient(newClient);
  // if response has empty string, save is successful
  if (response === "") {
    // Redirect to clients
    res.redirect("/clients");
    // // get current list of clients
    // const clients = await _clientRepo.getAllClients();
    // // render the Clients Index page
    // res.status(200).render("clientsIndex", {
    //   title: "Express Billing Clients Home",
    //   contributors: contributors,
    //   clients: clients ? clients : [],
    // });
  }
  // otherwise stay on form and repopulate fields, send error as a message
  else{
    res.render("clientCreate", {
        title: "Express Billing Create Client",
        contributors: contributors,
        newClient: newClient,
        message: response,
      });
  }
};
