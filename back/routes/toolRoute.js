const express = require("express");
const router = express.Router();
const toolController = require("../controllers/toolController");
const middleware = require("../middleware/middleware");

router.post(
  "/add",
  middleware.authenticator,
  middleware.isAdmin,
  toolController.createTool
);
router.get("/all", toolController.getAllTools);
router.delete(
  "/delete/:id",
  middleware.authenticator,
  middleware.isAdmin,
  toolController.deleteTool
);
router.put(
  "/update/:id",
  middleware.authenticator,
  middleware.isAdmin,
  toolController.updateTool
);
router.get("/search/:id", toolController.getToolById);

module.exports = router;
