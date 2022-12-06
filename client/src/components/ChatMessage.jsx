import { Card, Typography } from "@mui/material";
import React, { useState } from "react";

function ChatMessage(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      {visible && (
        <Typography
          //   sx={{ textAlign: props.data.recieved ? "left" : "right" }}
          key={props.message.message}
        >
          <Card
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            style={{
              alignSelf: props.message.recieved ? "end" : "start",
              background: props.message.recieved ? "powderblue" : "lightgray",
              borderRadius: "0.5rem",
              minWidth: "min-content",
              maxWidth: "70%",
              display: "flex",
              flexDirection: "column",
              // margin: "0.25rem",
              // padding: "0.25rem",
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
