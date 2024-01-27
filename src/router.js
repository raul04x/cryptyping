import { createBrowserRouter } from "react-router-dom";

import LandingPage from "./views/landing-page";
import User from "./views/user";
import Account from "./views/user/account";
import Trending from "./views/user/trending";
import BetForm from "./views/user/bet-form";
import Ranking from "./views/user/ranking";
import Favorite from "./views/user/favorite";

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
          {
            path: "ranking",
            element: <Ranking />,
          },
          {
            path: "favorite",
            element: <Favorite />,
          },
          {
            path: "bet",
            element: <BetForm />,
          },
        ],
      },
    ],
  },
]);

export default router;
