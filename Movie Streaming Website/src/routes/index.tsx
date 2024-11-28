import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import DetailsPage from "@/pages/DetailsPage";
import Home from "@/pages/Home";

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
        path: "movie/:movieId",
        element: <DetailsPage />,
      },
      {
        path: "search",
        element: <DetailsPage />,
      },
    ],
  },
]);

export default router;
