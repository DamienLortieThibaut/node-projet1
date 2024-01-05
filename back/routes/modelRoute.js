const express = require('express');
const router = express.Router();
const ModelController = require('../controllers/modelController');

router.post('/add', ModelController.createModel);
router.get('/all', ModelController.getAllModels);
router.put('/update/:modelId', ModelController.updateModel);
router.delete('/delete/:modelId', ModelController.deleteModel);

module.exports = router;
