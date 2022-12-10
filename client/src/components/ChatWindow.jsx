import { InputLabel } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatMessage from "./ChatMessage";

function SendIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </SvgIcon>
  );
}

export default function ChatWindow() {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const { roomId } = useParams();

  useEffect(() => {
    if (!socket) return;

    socket.on("message-from-server", (data) => {
      setChat((prev) => [...prev, { message: data.message, recieved: true }]);
    });

    socket.on("typing-started-from-server", () => setTyping(true));

    socket.on("typing-stopped-from-server", () => setTyping(false));
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("send-message", { message, roomId });
    setChat((prev) => [...prev, { message, recieved: false }]);
    setMessage("");
  }

  const [typingTimeout, setTypingTimeout] = useState(null);

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started", { roomId });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped", { roomId });
      }, 1000)
    );
  }

  return (
    <div
      id="chat-window"
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <div
        id="show-messages"
        style={{
          display: "flex",
          flexDirection: "column",
          // justifyContent: "flex-start",
          padding: "0.25rem",
          // flex: 1,
          overflowY: "auto",
        }}
      >
        {chat.map((message) => (
          <ChatMessage message={message} />
        ))}
      </div>

      <form component="form" onSubmit={handleForm}>
        {typing && (
          <InputLabel shrink htmlFor="message-input">
            Typing...
          </InputLabel>
        )}
        <TextField
          fullWidth
          id="message-input"
          value={message}
          placeholder="Write your message"
          onChange={handleInput}
          style={{ borderRadius: "2rem" }}
          InputProps={{
            "aria-label": "Write your message",
            endAdornment: (
              <InputAdornment position="start">
                <IconButton
                  id="input-button"
                  title="IconButton"
                  type="submit"
                  edge="end"
                >
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
}
