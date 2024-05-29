const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      currentMessage: {
        type: String,
      },
      date: { type: Date },
      userChat: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userChatType: {
        type: String,
        required: true,
      },
    },
  ],
  // expireAt: { type: Date, default: Date.now, expires: 3600 }, // 3600 giây = 60 phút
});

module.exports = mongoose.model("MessageSessions", sessionSchema);
