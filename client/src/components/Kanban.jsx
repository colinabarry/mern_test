import React, { useEffect, useState } from "react";
// import List from "../components/List";
import { Button } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function Kanban() {
  const { socket } = useOutletContext();
  // const [lists, addList] = useState([
  //   <List cardNames={["hi", "hey"]} />,
  //   <List />,
  //   <List />,
  // ]);
  const lists = [];

  function createList() {
    socket.emit("create-list");
    // addList((prev) => [...prev, <List cardNames={[]} />]);
  }

  useEffect(() => {
    if (!socket) return;

    socket.on("list-updated", (data) => {
      console.log("list-updated");
      lists = data.lists;
    });
  }, [socket]);

  return (
    <div style={{ flexDirection: "row" }}>
      {lists}
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
