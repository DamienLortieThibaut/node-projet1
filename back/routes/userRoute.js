const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
//const middleware = require('../middleware/middleware'); //

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/all', UserController.getAllUsers);
router.put('/uptade/:id', UserController.updateUser);
router.delete('/delete/:id', UserController.deleteUser);
router.get('/search/:id', UserController.getAllById);

module.exports = router;