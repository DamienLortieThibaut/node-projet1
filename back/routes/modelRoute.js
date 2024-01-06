const express = require('express');
const router = express.Router();
const modelController = require('../controllers/modelController');

router.post('/add',  modelController.uploadImage, modelController.createModel);
router.get('/all', modelController.readModel);
router.get('/search/:id', modelController.readModel);
router.put('/update/:id', modelController.updateModel);
router.delete('/delete/:id', modelController.deleteModel);

module.exports = router;
