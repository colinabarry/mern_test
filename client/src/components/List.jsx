import { Button, colors, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import ListCard from "./ListCard";
import { COLORS } from "../values/colors";
import { Label } from "@mui/icons-material";

function List(props) {
  const [cards, addCard] = useState([]);
  const [visible, setVisible] = useState(true);
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("List Title");

  function createCard() {
    addCard((prev) => [...prev, <ListCard />]);
    console.log(cards);
  }

  return (
    <div
      draggable
      className="list"
      style={{
        height: "min-content",
        maxHeight: "100%",
        minWidth: "min-content",
        overflowY: "auto",
        marginLeft: "0.1rem",
        marginRight: "0",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        paddingBottom: "0.5rem",
      }}
    >
      <Card
        onClick={(e) => {
          if (e.detail == 2) setVisible((prev) => !prev);
        }}
        sx={{
          background: COLORS.secondary,
          display: "flex",
          flexDirection: "column",
          width: "200pt",
          paddingTop: 1,
          marginLeft: 1,
          marginRight: 1,
          borderRadius: 2,
          // overflowY: "scroll",
        }}
      >
        {editingTitle ? (
          <TextField
            variant="standard"
            placeholder="List title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setEditingTitle((prev) => !prev)}
            inputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
              },
            }}
            sx={{
              padding: 1,
            }}
          ></TextField>
        ) : (
          <div
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: "1.5rem",
            }}
            onClick={() => setEditingTitle((prev) => !prev)}
          >
            {title}
          </div>
        )}
        {cards}
        <Button onClick={createCard} sx={{ marginTop: 1 }}>
          New Card
        </Button>
      </Card>
    </div>
  );
}

export default List;
