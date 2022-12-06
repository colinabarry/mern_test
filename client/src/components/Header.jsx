import { Button, Card } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./Header.css";

export default function Header() {
  const roomId = uuidv4();

  return (
    <Card
      // sx={{
      //   marginTop: 0,
      //   width: "100%",
      //   backgroundColor: "#303030",
      //   borderRadius: 0,
      //   boxShadow: 0,
      // }}
      raised
    >
      <Link to="/">
        <Button variant="text">Home</Button>
      </Link>
      <Link to="/chats">
        <Button variant="text">Chats</Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button variant="text">Room</Button>
      </Link>
    </Card>
  );
}
