const express = require('express');
const { signup, login, verifyEmail } = require('../controllers/auth.controller');

const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.post('/verify', verifyEmail);

module.exports = authRouter;