import { Button, colors, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import { COLORS } from "../values/colors";
import { useOutletContext } from "react-router-dom";
import { useRef } from "react";

export default function List(props) {
  // const [cards, addCard] = useState([]);
  // const [visible, setVisible] = useState(true);
  const { socket } = useOutletContext();
  const [editingTitle, setEditingTitle] = useState(false);
  const [title, setTitle] = useState("List Title");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!socket) return;

    setCards(props.data.cards);
    console.log(props.data);

    socket.on("room-joined", (updatedBoard) => {
      props.data.cards.length
        ? setCards(props.data.cards)
        : setCards([<div />]);
      console.log("updatedBoard: ", updatedBoard);
    });

    socket.on("card-created", (updatedCards) => {
      updatedCards.length ? setCards(updatedCards) : setCards([<div />]);
      console.log(cards);
    });
  }, [socket]);

  function createCard() {
    socket.emit("create-card", {
      listId: props.data._id,
      boardId: "6d82e764dda5430e8cebcfe0",
    });
    // addCard((prev) => [...prev, <ListCard />]);
    // console.log(cards);
  }

  function handleTitleBlur(e) {
    if (e.target.value == "") setTitle("List Title");
    setEditingTitle((prev) => !prev);
  }

  return (
    <div
      draggable={editingTitle ? false : true}
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
        // onClick={(e) => {
        // if (e.detail == 2) setVisible((prev) => !prev);
        // }}
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
            autoFocus
            variant="outlined"
            placeholder="List title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={(e) => handleTitleBlur(e)}
            inputProps={{
              style: {
                fontSize: "1.5rem",
                fontWeight: "bold",
                textAlign: "center",
                maxHeight: "0.5rem",
              },
            }}
            sx={{
              padding: 1,
            }}
          ></TextField>
        ) : (
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              alignSelf: "center",
            }}
            onClick={() => setEditingTitle((prev) => !prev)}
          >
            {title}
          </div>
        )}
        {cards.map((card) => (
          <Card key={card._id} data={card} />
        ))}
        <Button onClick={createCard} sx={{ marginTop: 1 }}>
          New Card
        </Button>
      </Card>
    </div>
  );
}
