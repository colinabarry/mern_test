import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import Kanban from "../components/Kanban";
import { COLORS } from "../values/colors";

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", { roomId: params.roomId });
  }, [socket, params.roomId]);

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
          width: `calc(100% - var(--aside-width))`,
          display: "flex",
          maxHeight: "100%",
          flexDirection: "row",
          overflowX: "auto",
          overflowY: "auto",
        }}
      >
        <Kanban />
      </section>
      <aside
        style={{
          background: `${COLORS.accent2}`,
          width: `var(--aside-width)`,
          borderRadius: "0.5rem",
          boxShadow: "-1rem 0 2rem 0 #00000077",
        }}
      >
        <ChatWindow />
      </aside>
    </main>
  );
}
