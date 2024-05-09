const chatRouter = require('express').Router();
const ChatController = require('../controller/chat.controller');

chatRouter.get('/get', ChatController.getChat);
chatRouter.post('/send', ChatController.sendChat);

module.exports = chatRouter;