import TypingController from "./controllers/TypingController.js";
import { getBoard, addBoard, addList } from "../dbController.js";

const sockets = (socket) => {
  const typingController = new TypingController(socket);
  socket.on("send-message", ({ message, roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    skt.emit("message-from-server", { message });
  });

  socket.on("typing-started", typingController.typingStarted);

  socket.on("typing-stopped", typingController.typingStopped);

  socket.on("join-room", async ({ roomId }) => {
    console.log("Joining room ");
    socket.join(roomId);

    let board = await getBoard(roomId);
    console.log("from socket.js: board = ", board);
    socket.emit("room-joined", board);

    // if (board == null) {
    //   console.log("null board");
    //   socket.emit("create-board", addBoard("6398ba84c89556f8df03179c", roomId));
    // }
  });

  socket.on("disconnect", (socket) => {
    console.log("User left.");
  });

  socket.on("create-list", async (boardId) => {
    const lists = await addList(boardId);
    socket.emit("list-created", lists);
    // console.log(lists);
    console.log("create list!");
  });
};

export default sockets;
