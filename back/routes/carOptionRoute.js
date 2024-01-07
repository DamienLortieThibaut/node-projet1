const express = require("express");
const router = express.Router();
const carOptionController = require("../controllers/carOptionController");

router.post("/add", carOptionController.add);
router.get("/all", carOptionController.getAll);
router.delete("/delete/:id", carOptionController.delete);
router.put("/update/:id", carOptionController.update);
router.get("/search/:id", carOptionController.getById);
router.get('/byModel/:modelId', carOptionController.getTools);
router.get('/byTool/:toolId', carOptionController.getModels);

module.exports = router;
