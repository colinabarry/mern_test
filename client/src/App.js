import Container from "@mui/material/Container";
import ChatWindow from "./components/ChatWindow";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { Typography } from "@mui/material";

function App() {
  return (
    <div>
      <Container>
        <Header />
        <Outlet />
      </Container>
    </div>
  );
}

export default App;
