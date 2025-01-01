const mongoose = require("mongoose");
const categoryBeltSchema = new mongoose.Schema(
  {
    name: String,
    rooms: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Evaluate" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("categoryBelt", categoryBeltSchema);
