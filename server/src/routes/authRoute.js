const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController.js');

authRouter.post('/register', authController.register.bind(authController));
authRouter.post('/login', authController.login.bind(authController));

module.exports = authRouter;