import React, { useState } from "react";
import { Typography, Card } from "@mui/material";

function ChatMessage(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      {visible && (
        <Typography
          //   sx={{ textAlign: props.data.recieved ? "left" : "right" }}
          key={props.data.message}
        >
          <Card
            onClick={() => {
              setVisible((prev) => !prev);
            }}
            sx={{
              margin: 0.5,
              padding: 0.75,
              backgroundColor: props.data.recieved ? "powderblue" : "lightgray",
              marginLeft: props.data.recieved ? 0 : 8,
              marginRight: props.data.recieved ? 8 : 0,
              borderRadius: 2,
            }}
          >
            {props.data.message}
          </Card>
        </Typography>
      )}
    </div>
  );
}

export default ChatMessage;
