import TypingController from "./controllers/TypingController.js";
import {
  getBoard,
  addBoard,
  addList,
  addCard,
  getList,
} from "../dbController.js";

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
    socket.join(roomId);

    let board = await getBoard(roomId);
    socket.emit("room-joined", board);
  });

  // socket.on("disconnect", (socket) => {
  //   // console.log("User left.");
  // });

  socket.on("create-list", async (boardId) => {
    const lists = await addList(boardId);
    socket.emit("board-updated", await getBoard(boardId));
    socket.emit("list-created", lists);
    console.log("create list!");
  });

  socket.on("create-card", async ({ listId, boardId }) => {
    const cards = await addCard(listId, boardId);
    const list = await getList(listId, boardId);
    socket.emit("card-created", list);
  });
};

export default sockets;
