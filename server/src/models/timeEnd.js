const mongoose = require("mongoose");
const timeEndSchema = new mongoose.Schema(
  {
    timeEnd: {
      type: Number,
      default: 180,
    },
    lottery: { type: mongoose.Schema.Types.ObjectId, ref: "Evaluate" },
    room: String,
  },

  {
    timestamps: true,
  }
);
module.exports = mongoose.model("PreTime", timeEndSchema);
