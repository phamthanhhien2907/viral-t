const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const connectedBD = await mongoose.connect(process.env.MONGODB_DB, {
      dbName: "t_viral",
    });
    if (!connectedBD) {
      console.log("Couldn't connect to MongoDB");
    } else {
      console.log("Connected to MongoDB");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
