import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Chats from "./pages/Chats";
import Home from "./pages/Home";
import Room from "./pages/Room";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/room/:roomId",
        element: <Room />,
      },
    ],
  },
]);

export default router;
