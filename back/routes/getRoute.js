const express = require("express");
const router = express.Router();
const getController = require("../controllers/getController");

router.post("/add", getController.add);
router.get("/all", getController.getAll);
router.delete("/delete/:id", getController.delete);
router.put("/update/:id", getController.update);
router.get("/search/:id", getController.getById);
module.exports = router;
