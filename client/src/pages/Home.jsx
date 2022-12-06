import { Typography } from "@mui/material";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { socket } = useOutletContext();
  console.log(socket);
  return <Typography>Welcome to ChatCore!</Typography>;
}
