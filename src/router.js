import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./views/landing-page";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);

export default router;
