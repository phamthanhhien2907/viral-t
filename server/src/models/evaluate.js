const mongoose = require("mongoose");
const categoryBelt = require("./categoryBelt");
const evaluateSchema = new mongoose.Schema(
  {
    period: {
      type: Number,
    },
    periodNumber: {
      type: Array,
    },
    timer: {
      type: Number,
      default: () => new Date().getTime() + 3 * 60 * 1000,
    },
    result: Array,

    resultUpdate: Array,
    room: String,
    image: String,

    users: [
      {
        UserId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Tên của model người dùng
        },
        result: Array,
        periodNumber: Number,
        resultValue: Array,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        money: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
evaluateSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // Nếu tài liệu bị xóa tồn tại
    await categoryBelt.updateMany(
      { rooms: doc._id },
      { $pull: { rooms: doc._id } }
    );
  }
});

module.exports = mongoose.model("Evaluate", evaluateSchema);
