const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./src/configs/connectDB");
const initRoutes = require("./src/routes");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server);
let countdown = 180;
require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

connectDB();
initRoutes(app);
// setInterval(() => {
//   countdown--;

//   if (countdown < 0) {
//     countdown = 180; // Reset to 3 minutes
//   }

//   io.emit("countdown", countdown);
// }, 1000);
// io.on("connection", (socket) => {
//   console.log("New client connected");
//   socket.emit("countdown", countdown); // Send the current countdown on connection

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
