import { InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SvgIcon from "@mui/material/SvgIcon";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
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
    <Card
      sx={{
        padding: 2,
        height: "100%",
        backgroundColor: "#414141",
        borderColor: "transparent",
        display: "flex",
        flexDirection: "column",
        borderRadius: 4,
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          // marginBottom: 4,
          justifyContent: "flex-start",
          flexGrow: 1,
        }}
      >
        {chat.map((data) => (
          <ChatMessage data={data} />
          // <Typography
          //   sx={{ textAlign: data.recieved ? "left" : "right" }}
          //   key={data.message}
          // >
          //   <Card
          //     onClick={() => {
          //       setVisible((prev) => !prev);
          //     }}
          //     sx={{
          //       margin: 0.5,
          //       padding: 0.75,
          //       backgroundColor: data.recieved ? "powderblue" : "lightgray",
          //       marginLeft: data.recieved ? 0 : 8,
          //       marginRight: data.recieved ? 8 : 0,
          //       borderRadius: 2,
          //     }}
          //   >
          //     {data.message}
          //   </Card>
          // </Typography>
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleForm}
        sx={{ justifyContent: "flex-end" }}
      >
        {typing && (
          <InputLabel
            sx={{
              color: "lightgray",
              fontWeight: "bold",
            }}
            shrink
            htmlFor="message-input"
          >
            Typing...
          </InputLabel>
        )}
        <TextField
          sx={{
            backgroundColor: "lightgray",
            borderRadius: 2,
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
  );
}
