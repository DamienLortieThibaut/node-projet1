const express = require("express");
const route = express.Router();
const buyController = require("../controllers/buyController");

route.post("/add", buyController.add);
route.put("/update/:id", buyController.update);
route.delete("/delete/:id", buyController.delete);
route.get("/all", buyController.getAll);
route.get("/searchId", buyController.getById);

module.exports = route;
