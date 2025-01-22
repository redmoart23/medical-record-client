import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/loginPage";
import { PatientDirectoryPage } from "@/pages/PatientDirectoryPage";
import { PatientInfoPage } from "@/pages/PatientInfoPage";

export const navigationRoutes = [
  {
    to: "/login",
    component: <LoginPage />,
  },
  {
    to: "/directory",
    component: <PatientDirectoryPage />,
  },
  {
    to: "/patient",
    component: <PatientInfoPage />,
  },
];

export const router = createBrowserRouter([
  {
    // path: "/",
    // element: <LoginPage />,
    children: [
      ...navigationRoutes.map(({ to, component }) => ({
        path: to,
        element: component,
      })),
      {
        path: "",
        element: <Navigate to={navigationRoutes[0].to} />,
      },
    ],
  },
]);
