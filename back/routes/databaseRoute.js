const express = require("express");
const route = express.Router();
const databaseController = require("../controllers/databaseController");
const middleware = require("../middleware/middleware");

route.get("/createAllTable", middleware.authenticator, middleware.isAdmin, databaseController.createAllTable);

module.exports = route;
