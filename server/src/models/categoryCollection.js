const mongoose = require("mongoose");
const categoryCollectionSchema = new mongoose.Schema(
  {
    name: String,
    category: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Collection" }],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("categoryCollection", categoryCollectionSchema);
