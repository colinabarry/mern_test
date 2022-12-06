import { Card, TextField } from "@mui/material";
import React, { useState } from "react";

function ListCard(props) {
  const [visible, setVisible] = useState(true);

  return (
    <div>
      {visible && (
        <Card
          onClick={(e) => {
            e.stopPropagation();
            if (e.detail == 2) setVisible((prev) => !prev);
          }}
          sx={{
            margin: 0.5,
            marginLeft: 1,
            marginRight: 1,
            backgroundColor: "lightgray",
            color: "white",
            padding: 1,
            borderRadius: 1.5,
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            multiline
            placeholder="Card title"
            sx={{ backgroundColor: "transparent", padding: 0 }}
          ></TextField>
          {/* <Typography>{props.title}</Typography> */}
        </Card>
      )}
    </div>
  );
}

export default ListCard;
