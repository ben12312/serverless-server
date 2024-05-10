const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ChatSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
