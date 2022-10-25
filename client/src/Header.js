import { Outlet, Link } from "react-router-dom";
import { Button, Card, Typography } from "@mui/material";
import React from "react";

export default function Header() {
  return (
    <Card sx={{ marginTop: 5, backgroundColor: "gray" }} raised>
      <Link to="/">
        <Button sx={{ color: "white", textDecoration: "none" }} variant="text">
          Home
        </Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: "white", textDecoration: "none" }} variant="text">
          Chats
        </Button>
      </Link>
    </Card>
  );
}
