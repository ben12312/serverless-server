const ChatModel = require('../model/chat.model');

class ChatController {
    static async getChat(req, res, next) {
        let { userId } = req.query;
        let chats = await ChatModel.find({ userId: userId }).distinct('chatRoom');
        res.status(200).json(chats)
    }

    static async sendChat(req, res, next) {
        let { userId, roomId, message, time } = req.body;
        if (!userId || !roomId || !message || !time) return res.status(400).json({ message: 'payload can not null' })
        let responseSend = await ChatModel.create({
            userId, roomId, message, time 
        })
        res.status(200).json(responseSend)
    }
}

module.exports = ChatController;