import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/HomePage/Home.jsx";
import MyAccount from "../pages/MyAccount/MyAccount.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
      },
    ],
  },
]);
