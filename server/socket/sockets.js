import TypingController from "./controllers/TypingController.js";
import { DBController } from "../dbController.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  const dbController = new DBController();
  socket.on("send-message", ({ message, roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-from-server", { message });
  });

  socket.on("typing-started", typingController.typingStarted);

  socket.on("typing-stopped", typingController.typingStopped);

  socket.on("join-room", ({ roomId }) => {
    console.log("Joining room ");
    socket.join(roomId);
  });

  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });

  socket.on("create-list", () => {
    console.log("create list!");
  });
};

export default sockets;
