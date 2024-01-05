const express = require('express');
const router = express.Router();
const toolController = require('../controllers/toolController');

router.post('/add', toolController.createTool);
router.get('/all', toolController.getAllTools);
router.delete('/delete/:id', toolController.deleteTool);
router.put('/update/:id', toolController.updateTool);
router.get('/search/:id', toolController.getToolById);

module.exports = router;