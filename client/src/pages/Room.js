import { Box, Typography, Grid, Card, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ChatWindow from "../components/ChatWindow";
import List from "../components/List";

export default function Room() {
  const params = useParams();
  const { socket } = useOutletContext();
  const [lists, addList] = useState([]);

  function createList() {
    addList((prev) => [...prev, <List />]);
  }

  useEffect(() => {
    if (!socket) return;

    socket.emit("join-room", { roomId: params.roomId });
  }, [socket]);

  return (
    <Grid
      container
      spacing={0}
      marginTop={0}
      sx={{
        height: "92vh",
        flexGrow: 1,
        // overflowY: "hidden",
      }}
    >
      <Grid
        item
        xs
        sx={{
          // direction: "row",
          // overflowX: "auto",
          // minWidth: "minContent",
          overflowY: "hidden",
        }}
      >
        {/* <Card
          sx={{
            display: "flex",
            // overflowX: "auto",
            // flexDirection: "row",
            padding: 2,
            backgroundColor: "#303030",
            height: "100%",
            borderRadius: 0,
            boxShadow: 0,
          }}
        > */}
        <Container
          disableGutters="true"
          maxWidth="false"
          sx={{
            margin: 0,
            height: "110%",
            display: "flex",
            // flexDirection: "row",
            overflowX: "scroll",
          }}
        >
          {lists}
          <Button
            onClick={createList}
            sx={{ marginLeft: 1, maxHeight: "28pt", minWidth: "75pt" }}
          >
            New List
          </Button>
        </Container>
        {/* </Card> */}
      </Grid>
      <Grid
        item
        xs={2.5}
        minWidth={"200pt"}
        sx={{ backgroundColor: "transparent" }}
      >
        <ChatWindow />
      </Grid>
    </Grid>
  );
}
