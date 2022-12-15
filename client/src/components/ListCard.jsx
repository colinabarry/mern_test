import { Card, TextField } from "@mui/material";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { COLORS } from "../values/colors";

function ListCard(props) {
  const { socket } = useOutletContext();
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("Card title");
  const [card, setCard] = useState({});

  function handleTitleBlur(e) {
    if (e.target.value == "") setTitle("Card title");
    setEditingTitle(false);
    socket.emit("title-changed", card);
  }

  function handleClickTitle(e) {
    setEditingTitle(true);
    if (title == "Card title") {
      setTitle("");
    }
  }

  return (
    <div draggable>
      <Card
        sx={{
          margin: 0.5,
          marginLeft: 1,
          marginRight: 1,
          backgroundColor: COLORS.text,
          color: "white",
          padding: 1,
          borderRadius: 1.5,
        }}
      >
        {editingTitle ? (
          <TextField
            fullWidth
            autoFocus
            variant="standard"
            multiline
            placeholder="Card title"
            value={title}
            onKeyDown={(e) => {
              if (e.key == "Enter") handleTitleBlur(e);
            }}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => handleTitleBlur(e)}
            InputProps={{ disableUnderline: true, style: { color: "black" } }}
            sx={{
              backgroundColor: "transparent",
              padding: 0,
            }}
          ></TextField>
        ) : (
          <div
            style={{ color: `${COLORS.primary}` }}
            onClick={(e) => handleClickTitle(e)}
          >
            {title}
          </div>
        )}
      </Card>
    </div>
  );
}

export default ListCard;
