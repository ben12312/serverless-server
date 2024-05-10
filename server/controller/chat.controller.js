const ChatModel = require('../model/chat.model');
const {verifyToken} = require('../helper/generateToken')
const moment = require('moment');

class ChatController {
    static async getChat(req, res, next) {
        let headers = JSON.parse(req.headers.authorization.split(' ')[1]);
        let resVerifyToken = verifyToken(headers.token);
        if (!resVerifyToken.id) return res.status(200).json([])

        let chats = await ChatModel.find({ roomId: 0 });
        let result = generateTimeChat(chats);
        res.status(200).json(result);
    }

    static async sendChat(params) {
        let dateString = params.message.realTime;
        let timestamp = moment(dateString).unix();
        let { userId, message } = params.message;
        if (!userId || !message ) return false;
        let createResp = await ChatModel.create({ userId, roomId: 0, message, timestamp })
        if (createResp) return true;
    }

    static async automationChatReply() {
        let sampleReply = {
            userId: `663a22a0e26f9d89bed5c1dc12`, // SAMPLE USER ID ROBOT
            roomId: 0,
            message: `auto respon message`,
            timestamp: moment(new Date()).unix()
        }
        let createResp = await ChatModel.create(sampleReply);
        if (createResp) {
            let result = {
                userId: createResp.userId,
                roomId: createResp.roomId,
                message: createResp.message,
                userId: createResp.userId,
                timestamp: createResp.timestamp,
                time: moment.unix(createResp.timestamp).format("HH:mm")
            }
            return result;
        } else return false
    }
}

function generateTimeChat(chats) {
    let result = [];
    for (let index = 0; index < chats.length; index++) {
        const el = chats[index];
        result.push({
            userId: el.userId,
            roomId: el.roomId,
            message: el.message,
            userId: el.userId,
            timestamp: el.timestamp,
            time: moment.unix(el.timestamp).format("HH:mm")
        })
    }
    return result;
}

module.exports = ChatController;