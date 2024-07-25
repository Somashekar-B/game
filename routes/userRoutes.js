const express = require('express');
const { addUser, login } = require('../controllers/userController');

const userRouter = express.Router();

userRouter.post('/', addUser);
userRouter.post('/login', login);

module.exports = { userRouter };


