import React, { useState } from "react";
import List from "../components/List";
import { Button } from "@mui/material";

export default function Kanban() {
  const [lists, addList] = useState([]);

  function createList() {
    addList((prev) => [...prev, <List />]);
  }
  return (
    <div style={{ flexDirection: "row" }}>
      {lists}
      <Button
        style={{
          height: "min-content",
          width: "max-content",
          background: "lightgray",
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
