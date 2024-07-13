import React, { useContext, useEffect } from "react";
import { MdPerson } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Card from "../components/card";
import SelectBoxFilters from "../components/selectBoxFilters";
import { DataContext } from "../../src/provider/context";

const Home = () => {
  const { getAllResturants, AllRestaurants } = useContext(DataContext);
  useEffect(() => {
    getAllResturants();
  });
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins">
      {/* banner container */}
      <div className="container flex flex-col justify-center items-center w-full mt-9 ">
        <img src="logo.png" alt="main" />
        {/* search bar and icon */}
        <div className="flex items-center w-full max-w-md mt-10 px-5">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Your Restaurants"
              className="w-full pl-4 pr-10 py-4 border rounded-full border-gray-300 focus:outline-none focus:border-primary"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
          </div>
          <div className="ml-4 p-2 border rounded-full border-primary">
            <a href="/accountSettings">
              {" "}
              <MdPerson className="text-4xl text-primary cursor-pointer" />
            </a>
          </div>
        </div>

        {/* scrollable container with background image */}
        <div
          className="relative mt-10 flex border-t rounded-lg flex-col items-center overflow-y-scroll p-4 bg-cover bg-center w-full h-full xl:w-3/4 "
          style={{
            backgroundImage: 'url("/Main-page-bg.jpg")', // Correct path to the image
          }}
        >
          <div className=" flex flex-row justify-center items-center  gap-6 my-7 ">
            <SelectBoxFilters />
          </div>
          {AllRestaurants &&
            AllRestaurants.map((i: any) => (
              <Card
                key={i.id}
                id={i.id}
                title={i.name}
                location={i.location}
                review={i.review}
                rating={i.rating}
                restaurantId={i.id}
                itemCount={i.menuItemsCount}
                link={`/restaurant/${i.id}`}
              />
            ))}
          {/* Add Restaurant Button */}
        </div>
        <a
          className="w-full text-center xl:w-3/4 py-3 bg-primary hover:bg-secondary text-white font-bold  sticky bottom-0 mb-0"
          href="/addRestaurant"
        >
          Add Restaurant
        </a>
      </div>
    </div>
  );
};

export default Home;
