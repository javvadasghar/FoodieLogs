import React, { useState } from "react";
import { DataContext } from "./context";

const DataProvider = ({ children }) => {
  const [AllRestaurants, setAllRestaurants] = useState("");
  const getAllResturants = async () => {
    await fetch(
      `${process.env.REACT_APP_API_URL}/api/restaurants/fetchRestaurants`,
      {
        method: "GET",
        // headers: headers(__token),
        // mode: "cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setAllRestaurants(data?.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <DataContext.Provider value={{ getAllResturants, AllRestaurants }}>
      {children}
    </DataContext.Provider>
  );
};
export default DataProvider;
