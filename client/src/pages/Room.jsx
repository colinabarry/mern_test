import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import Kanban from "../components/Kanban";

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", { roomId: params.roomId });
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
          background: "green",
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
          background: "blue",
          width: `var(--aside-width)`,
          borderRadius: "0.5rem",
        }}
      >
        <ChatWindow />
      </aside>
    </main>
  );
}
