import express from "express";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 4000;

const httpServ = http.createServer(app);
const io = new Server(httpServ, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
  //   res.json({ data: "hello world from socket" });
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  socket.on("send-message", (data) => {
    socket.emit("message-from-server", data);
  });
});

httpServ.listen(PORT, () => {
  console.log("Server is running at http://localhost:4000");
});
