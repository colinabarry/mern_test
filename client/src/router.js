import { createBrowserRouter } from "react-router-dom";
import App from "./App.js";
import ChatWindow from "./components/ChatWindow.js";
import Home from "./pages/Home.js";

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
        element: <ChatWindow />,
      },
    ],
  },
]);

export default router;
