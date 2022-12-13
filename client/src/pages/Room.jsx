import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import Kanban from "../components/Kanban";
import { COLORS } from "../values/colors";

// let board = null;

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", { roomId: params.roomId /*, board: board*/ });

    socket.on("create-board", (newBoard) => {
      // board = newBoard;
      // console.log("board = ", board);
    });
  }, [socket]);

  return (
    <main
      style={{
        "--aside-width": "16rem",
        display: "flex",
        height: "100%",
      }}
    >
      <section
        style={{
          background: COLORS.primary,
          // background: "#eaeaea",
          width: `calc(100% - var(--aside-width))`,
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Kanban />
      </section>
      <aside
        style={{
          background: `${COLORS.accent}`,
          width: `var(--aside-width)`,
          borderRadius: "0.5rem",
          boxShadow: "-2rem 0 2rem -1.5rem #00000055",
        }}
      >
        <ChatWindow />
      </aside>
    </main>
  );
}
