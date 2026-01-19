const mongoose = require("mongoose");

const codeSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true, // one code per room
    },
    code: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "javascript",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Code", codeSchema);
