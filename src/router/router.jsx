import { createBrowserRouter, Navigate } from "react-router-dom";
import { LoginPage } from "@/pages/LoginPage";
import { PatientDirectoryPage } from "@/pages/PatientDirectoryPage";
import PropTypes from "prop-types";

// Function to check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("x-token");
  return !!token;
};

// PrivateRoute component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export const navigationRoutes = [
  {
    to: "/login",
    component: <LoginPage />,
  },
  {
    to: "/directory",

    component: (
      <PrivateRoute>
        <PatientDirectoryPage />
      </PrivateRoute>
    ),
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

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
