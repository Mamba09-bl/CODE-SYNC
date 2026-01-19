const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    roomId: String,
    username: String,
    message: String,
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Message || mongoose.model("Message", messageSchema);
