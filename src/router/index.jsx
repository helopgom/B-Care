import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);
