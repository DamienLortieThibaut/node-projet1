const express = require("express");
const route = express.Router();
const buyController = require("../controllers/buyController");
const middleware = require("../middleware/middleware");

route.post("/add", middleware.authenticator, buyController.add);
route.put("/update/:id", middleware.authenticator, buyController.update);
route.delete(
  "/delete/:id",
  middleware.authenticator,
  middleware.isAdmin,
  buyController.delete
);
route.get(
  "/all",
  middleware.authenticator,
  middleware.isAccounterOrAdmin,
  buyController.getAll
);
route.get(
  "/search/:id",
  middleware.authenticator,
  middleware.isAccounterOrAdmin,
  buyController.getById
);

module.exports = route;
