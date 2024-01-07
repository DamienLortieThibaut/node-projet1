const express = require("express");
const router = express.Router();
const carOptionController = require("../controllers/carOptionController");
const middleware = require("../middleware/middleware");

router.post(
  "/add",
  middleware.authenticator,
  middleware.isAdmin,
  carOptionController.add
);
router.get("/all", carOptionController.getAll);
router.delete(
  "/delete/:id",
  middleware.authenticator,
  middleware.isAdmin,
  carOptionController.delete
);
router.put(
  "/update/:id",
  middleware.authenticator,
  middleware.isAdmin,
  carOptionController.update
);
router.get(
  "/search/:id",
  middleware.authenticator,
  carOptionController.getById
);
router.get(
  "/byModel/:modelId",
  carOptionController.getTools
);
router.get(
  "/byTool/:toolId",
  carOptionController.getModels
);

module.exports = router;
