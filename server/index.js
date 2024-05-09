const express = require("express");
const app = express();
const port = 5000;
const router = require("./routes/router");
const mongoose = require("mongoose");
const db = require("./db/key").mongoURI;
const cors = require('cors');

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
    socket.emit('custom_connect', {
        message: 'asdadasd'
    })
    // socket.on('chat message', (msg) => {
    //     console.log('message: ' + msg);
    // });
    console.log('a user connected');
});

server.listen(port, () => {
  console.log(`Server running in port ${port}`);
});
