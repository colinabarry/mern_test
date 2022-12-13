import React, { useEffect, useState } from "react";
import { Button, listClasses } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import List from "./List";

// let lists = [];

export default function Kanban() {
  const { socket } = useOutletContext();
  const [lists, setLists] = useState([]);
  // const [lists, addList] = useState([
  //   <List cardNames={["hi", "hey"]} />,
  //   <List />,
  //   <List />,
  // ]);

  function createList() {
    socket.emit("create-list", "6d82e764dda5430e8cebcfe0");
    // addList((prev) => [...prev, <List cardNames={[]} />]);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("room-joined", (board) => {
      // console.log(board);
      setLists(board.lists);
    });

    socket.on("list-created", (updatedLists) => {
      setLists(updatedLists);
    });

    // socket.on("list-updated", (data) => {
    //   console.log("list-updated");
    //   lists = data.lists;
    // });
  }, [socket]);

  return (
    <div style={{ flexDirection: "row" }}>
      {lists.map((list) => (
        <List />
      ))}
      <Button
        style={{
          height: "min-content",
          width: "max-content",
          background: "#FFFFFF",
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
