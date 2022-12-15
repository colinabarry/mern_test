import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import List from "./List";
import { COLORS } from "../values/colors";

export default function Kanban() {
  const { socket } = useOutletContext();
  const [lists, setLists] = useState([]);

  function createList() {
    socket.emit("create-list", "6d82e764dda5430e8cebcfe0");
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("room-joined", (updatedBoard) => {
      setLists(updatedBoard.lists);
    });

    socket.on("list-created", (updatedLists) => {
      setLists(updatedLists);
    });
  }, [socket]);

  return (
    <div style={{ flexDirection: "row", maxHeight: "100%" }}>
      {lists.map((list) => (
        <List key={list._id} data={list} style={{ maxHeight: "100%" }} />
      ))}
      <Button
        style={{
          height: "min-content",
          width: "max-content",
          background: `${COLORS.secondary}`,
          color: `${COLORS.accent2}`,
          marginLeft: "0rem",
          marginRight: ".5rem",
        }}
        onClick={createList}
      >
        New List
      </Button>
    </div>
  );
}
