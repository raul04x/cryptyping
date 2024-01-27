import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/landing-page";
import User from "./views/user";
import Account from "./views/user/account";
import Trending from "./views/user/trending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    children: [
      {
        path: "user",
        element: <User />,
        children: [
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "trending",
            element: <Trending />,
          },
        ],
      },
    ],
  },
]);

export default router;
