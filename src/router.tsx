import { createBrowserRouter } from "react-router-dom";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/dynamic_calendar/",
    element: <App />,
  },
]);
