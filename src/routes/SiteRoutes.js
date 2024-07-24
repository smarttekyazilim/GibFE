import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
//layouts
import AppLayout from "../components/layout/AppLayout";
import AuthLayout from "../components/layout/AuthLayout";
//pages
import Login from "../pages/Auth/Login";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import ChangePassword from "../pages/Auth/ChangePassword";
import Parameters from "../pages/Settings/Parameters";
import Profile from "../pages/Users/Profile";
import ResetPassword from "../pages/Auth/ResetPassword";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import GibPageOne from "../pages/Gib/GibPageOne";
import GibPageTwo from "../pages/Gib/GibPageTwo";
import GibPageThree from "../pages/Gib/GibPageThree";
import GibPageFour from "../pages/Gib/GibPageFour";
import GibError from "../pages/Gib/GibError";

const Pages = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      {
        path: "/",
        element: <ProtectedRoute id="1" element={<Home />} />,
      },
      { path: "404", element: <NotFound /> },
      {
        path: "parameters",
        element: <ProtectedRoute id="99" element={<Parameters />} />,
      },
    ],
  },
    {
    path: "/gib",
    element: <AppLayout />,
    children: [
      {
        path: "/gib-page-one",
        element: <ProtectedRoute id="801" element={<GibPageOne />} />,
      },
      {
        path: "/gib-page-two",
        element: <ProtectedRoute id="802" element={<GibPageTwo />} />,
      },
      {
        path: "/gib-page-three",
        element: <ProtectedRoute id="803" element={<GibPageThree />} />,
      },
      {
        path: "/gib-page-four",
        element: <ProtectedRoute id="804" element={<GibPageFour />} />,
      },
      {
        path: "/gib-error",
        element: <ProtectedRoute id="805" element={<GibError />} />,
      },
    ],
  },

  {
    path: "/checker-operations",
    element: <AppLayout />,
    children: [

    ],
  },
  {
    path: "/profile",
    element: <AppLayout />,
    children: [
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    path: "/change-password",
    element: <AuthLayout />,
    children: [{ path: "/change-password", element: <ChangePassword /> }],
  },
  {
    path: "/reset-password",
    element: <AuthLayout />,
    children: [{ path: "/reset-password", element: <ResetPassword /> }],
  },
  {
    path: "/forgot-password",
    element: <AuthLayout />,
    children: [{ path: "/forgot-password", element: <ForgotPassword /> }],
  },
];
export default function SiteRoutes() {
  return useRoutes([...Pages]);
}
