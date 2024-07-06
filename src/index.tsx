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
import DataProvider from "./provider/provider";

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
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/addRestaurant",
    element: <AddRestaurant />,
    errorElement: <NotFound />,
  },
  {
    path: "/restaurant/:id",
    element: <Restaurant />,
    errorElement: <NotFound />,
  },
  {
    path: "/editMenuItem",
    element: <EditMenuItem />,
    errorElement: <NotFound />,
  },
  {
    path: "/termsAndConditions",
    element: <TermsAndConditions />,
    errorElement: <NotFound />,
  },
  {
    path: "/accountSettings",
    element: <AccountSettings />,
    errorElement: <NotFound />,
  },
  {
    path: "/editAccount",
    element: <EditAccount />,
    errorElement: <NotFound />,
  },
  {
    path: "/editRestaurant",
    element: <EditRestaurant />,
    errorElement: <NotFound />,
  },
  {
    path: "/restaurants/:restaurantId/addMenuItem",
    element: <AddMenuItem />,
    errorElement: <NotFound />,
  },
  {
    path: "/menuItem",
    element: <SingleMenuItem />,
    errorElement: <NotFound />,
  },
]);

root.render(
  <React.StrictMode>
    <DataProvider>
      <RouterProvider router={router} />
    </DataProvider>
  </React.StrictMode>
);
