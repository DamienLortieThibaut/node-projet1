const express = require("express");
const router = express.Router();
const modelController = require("../controllers/modelController");
const middleware = require("../middleware/middleware");

router.post(
  "/add",
  middleware.authenticator,
  middleware.isAdmin,
  modelController.uploadImage,
  modelController.createModel
);
router.get(
  "/all",
  modelController.readModel
);
router.get(
  "/search/:id",
  modelController.readModel
);
router.put(
  "/update/:id",
  middleware.authenticator,
  middleware.isAdmin,
  modelController.updateModel
);
router.delete(
  "/delete/:id",
  middleware.authenticator,
  middleware.isAdmin,
  modelController.deleteModel
);

module.exports = router;
