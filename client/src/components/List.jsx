import { Button, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import React, { useState } from "react";
import ListCard from "./ListCard";

function List() {
  const [cards, addCard] = useState([]);
  const [visible, setVisible] = useState(true);

  function createCard() {
    addCard((prev) => [...prev, <ListCard />]);
    console.log(cards);
  }

  return (
    <div
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
      }}
    >
      {visible && (
        <Card
          onClick={(e) => {
            if (e.detail == 2) setVisible((prev) => !prev);
          }}
          sx={{
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
          <TextField
            variant="standard"
            placeholder="List title"
            sx={{ backgroundColor: "transparent", padding: 1 }}
          ></TextField>
          {cards}

          <Button onClick={createCard} sx={{ marginTop: 1 }}>
            New Card
          </Button>
        </Card>
        // </Container>
      )}
    </div>
  );
}

export default List;
