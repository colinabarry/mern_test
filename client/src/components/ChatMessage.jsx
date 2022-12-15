import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "../values/colors";

function ChatMessage(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className="message"
      style={{
        display: "flex",
        justifyContent: props.message.recieved ? "start" : "end",
        alignItems: props.message.recieved ? "start" : "end",
        alignSelf: props.message.recieved ? "start" : "end",
        height: "min-content",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
        maxWidth: "100%",
      }}
    >
      <Card
        onClick={() => {
          setVisible((prev) => !prev);
        }}
        style={{
          background: props.message.recieved
            ? `${COLORS.secondary}`
            : `${COLORS.accent}`,
          width: "max-content",
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
    </div>
  );
}

export default ChatMessage;
