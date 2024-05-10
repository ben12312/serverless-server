const express = require("express");
const app = express();
const port = 5000;
const router = require("./routes/router");
const mongoose = require("mongoose");
const db = require("./db/key").mongoURI;
const cors = require('cors');
const ChatController = require('./controller/chat.controller');

// const { WebSocketServer } = require("ws");
// const wss = new WebSocketServer({ port: 8080 });

// wss.on("connection", function connection(ws) { // CHAT
//   ws.on("message", function message(data) {
//     console.log("received: %s", data);
//   });

//   ws.send("something");
// });
const { createServer } = require('node:http');
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

mongoose
  .connect(db)
  .then(() => console.log("mongoDB Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.get('/', (req, res) => {
    res.send('masuk')
})

io.on('connection', (socket) => { // CHAT
    socket.on('send_chat', async (data) => {
        ChatController.sendChat(data);
        let respAutoChat = await ChatController.automationChatReply();
        socket.emit('reply_chat', respAutoChat);
        console.log(`message sent from userid : ${data.message.userId}`);
    })  
    console.log('a user connected');
});

server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
