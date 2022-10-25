import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import SvgIcon from "@mui/material/SvgIcon";
import { InputLabel } from "@mui/material";

function SendIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
    </SvgIcon>
  );
}

export default function ChatWindow() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

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
    socket.emit("send-message", { message });
    setChat((prev) => [...prev, { message, recieved: false }]);
    setMessage("");
  }

  const [typingTimeout, setTypingTimeout] = useState(null);

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started");

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        socket.emit("typing-stopped");
      }, 1000)
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Card
        sx={{
          padding: 2,
          marginTop: 10,
          width: "75%",
          backgroundColor: "gray",
          //   borderRadius: 4,
        }}
      >
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((data) => (
            <Typography
              sx={{ textAlign: data.recieved ? "left" : "right" }}
              key={data.message}
            >
              {data.message}
            </Typography>
          ))}
        </Box>
        <Box component="form" onSubmit={handleForm}>
          {typing && (
            <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">
              Typing...
            </InputLabel>
          )}
          <TextField
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
            }}
            fullWidth
            id="message-input"
            value={message}
            variant="outlined"
            placeholder="Write your message"
            onChange={handleInput}
            InputProps={{
              "aria-label": "Write your message",
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton title="IconButton" type="submit" edge="end">
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
