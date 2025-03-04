import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import NotFound from "./pages/notFound";
import Home from "./pages/home";
import AddRestaurant from "./pages/addRestaurant";
import Restaurant from "./pages/restaurant";
import EditMenuItem from "./pages/editMenuItem";
import TermsAndConditions from "./pages/termsAndConditions";
import AccountSettings from "./pages/accountSettings";
import EditRestaurant from "./pages/editRestaurant";
import EditAccount from "./pages/editAccount";
import SingleMenuItem from "./pages/singleMenuItem";
import AddMenuItem from "./pages/addMenuItem";
import PrivateRoute from "./components/PrivateRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <NotFound />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <PrivateRoute element={<Home />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/addRestaurant",
    element: <PrivateRoute element={<AddRestaurant />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/restaurant/:id",
    element: <PrivateRoute element={<Restaurant />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/editMenuItem/:id",
    element: <PrivateRoute element={<EditMenuItem />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/termsAndConditions",
    element: <PrivateRoute element={<TermsAndConditions />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/accountSettings",
    element: <PrivateRoute element={<AccountSettings />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/editAccount",
    element: <PrivateRoute element={<EditAccount />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/editRestaurant/:id",
    element: <PrivateRoute element={<EditRestaurant />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/restaurants/:restaurantId/addMenuItem",
    element: <PrivateRoute element={<AddMenuItem />} />,
    errorElement: <NotFound />,
  },
  {
    path: "/menuItem",
    element: <PrivateRoute element={<SingleMenuItem />} />,
    errorElement: <NotFound />,
  },
]);

root.render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
);
