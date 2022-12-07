import { Card, Typography } from "@mui/material";
import React, { useState } from "react";

function ChatMessage(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="message"
      style={{
        alignSelf: props.message.recieved ? "start" : "end",
        height: "min-content",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      {visible && (
        <Typography style={{ width: "100%" }} key={props.message.message}>
          <Card
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            style={{
              // alignSelf: props.message.recieved ? "start" : "end",
              background: props.message.recieved ? "yellow" : "lightgray",
              // borderRadius: "0.5rem",
              minWidth: "min-content",
              maxWidth: "70%",
              display: "flex",
              flexDirection: "column",
              marginLeft: "0.5rem",
              marginRight: "0.5rem",
              paddingTop: "0.25rem",
              paddingLeft: "0.25rem",
              paddingRight: "0.25rem",
            }}
          >
            {props.message.message}
          </Card>
        </Typography>
      )}
    </div>
  );
}

export default ChatMessage;
