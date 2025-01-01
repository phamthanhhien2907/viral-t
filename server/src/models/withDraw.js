const mongoose = require("mongoose");
const withDrawSchema = new mongoose.Schema(
  {
    withDraw: {
      type: Number,
    },
    users: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: {
      type: String,
      enum: ["Thành công", "Đợi duyệt", "Không thành công"],
      default: "Đợi duyệt",
    },
    reson: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("WithDraw", withDrawSchema);
