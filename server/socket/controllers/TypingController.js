export default class TypingController {
  socket;
  constructor(socket) {
    this.socket = socket;
  }

  getSkt = ({ roomId }) => {
    let skt = this.socket.broadcast;
    skt = roomId ? skt.to(roomId) : socket.broadcast;
    return skt;
  };

  typingStarted = ({ roomId }) => {
    let skt = this.getSkt({ roomId });
    skt.emit("typing-started-from-server");
  };

  typingStopped = ({ roomId }) => {
    let skt = this.getSkt({ roomId });
    skt.emit("typing-stopped-from-server");
  };
}
