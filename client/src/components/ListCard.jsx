import { Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { COLORS } from "../values/colors";

function ListCard(props) {
  const [visible, setVisible] = useState(true);
  const colors = ["#136F63", "#22AAA1", "#4CE0D2"];
  var color = colors[Math.floor(Math.random() * colors.length)];
  console.log(color);
  // useEffect(() => {

  //   color = colors.}, []);

  return (
    <div draggable>
      {visible && (
        <Card
          onClick={(e) => {
            e.stopPropagation();
            if (e.detail === 2) setVisible((prev) => !prev);
          }}
          sx={{
            margin: 0.5,
            marginLeft: 1,
            marginRight: 1,
            // backgroundColor: `${color}`,
            backgroundColor: COLORS.text,
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
            inputProps={{ style: { color: "black" } }}
            // color="white"
            sx={{
              backgroundColor: "transparent",
              // color: "white",
              padding: 0,
            }}
            value={props.name}
          ></TextField>
          {/* <Typography>{props.title}</Typography> */}
        </Card>
      )}
    </div>
  );
}

export default ListCard;
