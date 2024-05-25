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
  expireAt: { type: Date, default: Date.now, expires: 3600 }, // 3600 giây = 60 phút
});

module.exports = mongoose.model("Session", sessionSchema);

sessionSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });
