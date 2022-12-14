import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useOutletContext } from "react-router-dom";
import List from "./List";

// let lists = [];

export default function Kanban() {
  const { socket } = useOutletContext();
  const [board, setBoard] = useState({});
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

    socket.on("room-joined", (updatedBoard) => {
      // console.log(board);
      setLists(updatedBoard.lists);
      // setBoard(updatedBoard);
    });

    // socket.on("board-updated", (updatedBoard) => {
    // setBoard(updatedBoard);
    // });

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
      {/* {console.log("lists: ", lists)} */}
      {/* {console.log("board: ", board)} */}
      {lists.flatMap((list) => (
        <List key={list._id} data={list.cards} />
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
