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

  return <Outlet context={{ socket }} />;
}

export default App;
