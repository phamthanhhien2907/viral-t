const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const depositSchema = new mongoose.Schema(
  {
    deposit: {
      type: Number,
      default: 0,
    },
    users: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Deposit", depositSchema);
