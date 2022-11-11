import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import Header from "./components/Header";

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  return (
    <div>
      <Container
        maxWidth={false}
        disableGutters
        sx={{ backgroundColor: "transparent" }}
      >
        <Header socket={socket} />
        <Box sx={{ backgroundColor: "transparent" }}>
          <Outlet context={{ socket }} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
