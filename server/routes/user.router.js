const userRouter = require('express').Router();
const UserController = require('../controller/user.controller');

userRouter.get('/get', UserController.getUser);
userRouter.post('/register', UserController.register);
userRouter.post('/login', UserController.login);
userRouter.post('/update', UserController.update);

module.exports = userRouter;