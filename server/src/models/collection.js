const mongoose = require("mongoose");
const categoryCollection = require("./categoryCollection");
const collectionSchema = new mongoose.Schema({
  title: String,
  category: String,
  image: String,
  video: String,
  view: {
    // type: Number,
    // default: 0,
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
collectionSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    // Nếu tài liệu bị xóa tồn tại
    await categoryCollection.updateMany(
      { category: doc._id },
      { $pull: { category: doc._id } }
    );
  }
});
module.exports = mongoose.model("Collection", collectionSchema);
