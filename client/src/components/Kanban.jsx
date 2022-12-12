import React, { useState } from "react";
import List from "../components/List";
import { Button } from "@mui/material";

export default function Kanban() {
  const [lists, addList] = useState([
    <List cardNames={["hi", "hey"]} />,
    <List />,
    <List />,
  ]);

  function createList() {
    addList((prev) => [...prev, <List cardNames={[]} />]);
  }

  return (
    <div style={{ flexDirection: "row" }}>
      {lists}
      <Button
        style={{
          height: "min-content",
          width: "max-content",
          // background: "#FFFFFF",
          marginLeft: "0rem",
          marginRight: ".5rem",
          marginTop: ".5rem",
        }}
        onClick={createList}
      >
        New List
      </Button>
    </div>
  );
}
