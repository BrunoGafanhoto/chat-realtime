const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 3001;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("chat.message", (data) => {
    console.log("[SOCKET] Chat .message =>", data);
    io.emit("chat.message", data);
  });

  socket.on("disconnect", () => {
    console.log("[SOCKET] Disconnect => A connection was disconnect");
  });
});

server.listen(PORT, () => {
  console.log("Listening server on Port " + PORT);
});
