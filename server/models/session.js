const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  adminId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  messages: [
    {
      message: {
        type: String,
      },
      date: { type: Date },
      userId: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
});

module.exports = mongoose.model("Session", sessionSchema);
