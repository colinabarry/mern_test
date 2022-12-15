import { Button, colors, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { COLORS } from "../values/colors";
import { useOutletContext } from "react-router-dom";

export default function List(props) {
  const { socket } = useOutletContext();
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("List Title");
  const [list, setList] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!socket) return;

    setList(props.data);
    setCards(props.data.cards);

    socket.on("card-created", (updatedList) => {
      if (updatedList._id == props.data._id) setList(updatedList);
    });
  }, [socket]);

  function createCard() {
    socket.emit("create-card", {
      listId: props.data._id,
      boardId: "6d82e764dda5430e8cebcfe0",
    });
  }

  function handleTitleBlur(e) {
    if (e.target.value == "") setTitle("List Title");
    setEditingTitle(false);
    socket.emit("list-title-changed", list);
  }

  function handleClickTitle(e) {
    setEditingTitle(true);
    if (title == "List Title") {
      setTitle("");
    }
  }

  return (
    <Card
      sx={{
        className: "list",
        draggable: `${editingTitle ? false : true}`,
        background: COLORS.secondary,
        display: "flex",
        flexDirection: "column",
        height: "min-content",
        maxHeight: "100%",
        width: "200pt",
        marginRight: 1,
        borderRadius: 2,
        InputProps: { draggable: `${editingTitle ? false : true}` },
      }}
    >
      {editingTitle ? (
        <TextField
          autoFocus
          variant="outlined"
          placeholder="List Title"
          value={title}
          onKeyDown={(e) => {
            if (e.key == "Enter") handleTitleBlur(e);
          }}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => handleTitleBlur(e)}
          size="small"
          InputProps={{
            style: {
              fontFamily: "Atkinson Hyperlegible, sans serif",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlignLast: "center",
              borderColor: "white",
            },
          }}
          sx={{ padding: 1 }}
        ></TextField>
      ) : (
        <div
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            alignSelf: "center",
            marginTop: "1.2rem",
            marginBottom: "1.2rem",
          }}
          onClick={(e) => handleClickTitle(e)}
        >
          {title}
        </div>
      )}
      <div style={{ overflowY: "auto", scrollBehavior: "smooth" }}>
        {list.cards &&
          list.cards.map((card) => <ListCard key={card._id} data={card} />)}
      </div>

      <Button sx={{ color: `${COLORS.accent2}` }} onClick={createCard}>
        New Card
      </Button>
    </Card>
  );
}
