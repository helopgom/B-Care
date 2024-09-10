import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout.jsx";
import Home from "../pages/HomePage/Home.jsx";
import MyAccount from "../pages/MyAccount/MyAccount.jsx";
import EditPersonalData from "../pages/EditPersonalData/EditPersonalData.jsx";
import EditPreferences from "../pages/EditPreferences/EditPreferences.jsx";
import Login from "../components/login/Login.jsx";
import SignUp from "../components/signUp/signUp/SignUp.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/myaccount",
        element: <MyAccount />,
      },
      {
        path: "/editPersonalData",
        element: <EditPersonalData />,
      },
      {
        path: "/editPreferences",
        element: <EditPreferences />,
      },
    ],
  },
]);
