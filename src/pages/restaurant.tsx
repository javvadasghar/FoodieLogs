import { useState, useEffect } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { FaSearch } from "react-icons/fa";
import CustomFilterDropdown from "../components/filters";
import Card from "../components/card";
import { FaStar } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import "../../src/index.css";
import axios from "axios";

const Restaurant: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Menu");

  const [restaurant, setRestaurant] = useState<any>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRestaurant = async () => {
      ;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/restaurants/fetchRestaurant/${id}`
        );
        ;
        setRestaurant(response?.data?.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <ScreenWrapper title={restaurant.name} isHeartVisible={true}>
      <div className="flex flex-row">
        {/* Menu Button */}
        <div
          onClick={() => setSelectedOption("Menu")}
          className={`px-10 py-2 cursor-pointer mr-4 mb-2 min-w-16 text-center font-poppins border border-primary rounded-3xl ${
            selectedOption === "Menu" ? "bg-primary text-white" : ""
          }`}
        >
          <p className="text-center font-poppins font-bold uppercase">Menu</p>
        </div>
        {/* About Button */}
        <div
          onClick={() => setSelectedOption("About")}
          className={`px-10 py-2 cursor-pointer mr-4 mb-2 min-w-16 text-center font-poppins border border-primary rounded-3xl ${
            selectedOption === "About" ? "bg-primary text-white" : ""
          }`}
        >
          <p className="text-center font-poppins font-bold uppercase">About</p>
        </div>
      </div>

      {selectedOption === "Menu" ? (
        <>
          {/* SEARCH BAR */}
          <div className="flex items-center w-full max-w-md mt-10 px-5">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search Your Restaurants"
                className="w-full pl-4 pr-10 py-3 border rounded-full border-gray-300 focus:outline-none focus:border-primary"
              />
              <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl" />
            </div>
          </div>
          {/* CUSTOM FILTER */}
          <CustomFilterDropdown
            filterTitle="SORT BY FAVORITES"
            options={[
              "SORT A-Z",
              "SORT Z-A",
              "SORT RATING HIGH TO LOW",
              "SORT RATING LOW TO HIGH",
            ]}
          />
          {/* Menu items */}
          <div className="flex flex-col justify-center items-center">
            <div className="relative flex flex-col items-center overflow-y-scroll bg-cover bg-center h-full">
              {restaurant &&
                restaurant?.menuItems.map((item: any) => (
                  <Card
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    review={item.review}
                    rating={item.rating}
                    restaurantId={item.id}
                    link="#"
                    styleExternalWidth="lg:w-full border-2 border-greyDark"
                  />
                ))}
              {/* Add Restaurant Button */}
              <Link
                className="w-full xl:w-2/4 py-3 bg-primary hover:bg-secondary text-white font-bold text-center"
                to={`/restaurants/${id}/addMenuItem`}
              >
                Add Menu Item
              </Link>
              {/* <button className="w-full xl:w-2/4 py-3 bg-primary hover:bg-secondary text-white font-bold">
                Add Menu Item
              </button> */}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* About */}
          <div className="flex flex-row gap-5 justify-center items-center mt-10">
            <div className="flex flex-row gap-1 items-center">
              <p className="text-lg font-bold font-poppins">
                {restaurant.rating}
              </p>
              <FaStar className="text-[#333132]" size={18} />
            </div>
            <p className="font-poppins text-[#7E7E7E]">{restaurant.location}</p>
          </div>

          <div className="flex flex-row gap-5 justify-center items-center mt-5">
            <div
              className={`px-7 py-2 cursor-pointer mr-4 mb-2 min-w-16 text-center font-poppins border border-primary rounded-3xl bg-primary text-white`}
            >
              <p className="text-center font-poppins text-white uppercase">
                {restaurant.priceRange}
              </p>
            </div>
            <a href="/editRestaurant">
              <BiSolidPencil
                className="text-primary border-2 border-grayDark rounded-full p-2 cursor-pointer"
                size={40}
              />
            </a>
          </div>

          <div className="flex flex-col mt-5">
            <h3 className="uppercase font-poppins font-bold text-xl text-left">
              Review and notes
            </h3>
            <p className="font-poppins mt-3">{restaurant.description} </p>
          </div>
        </>
      )}
    </ScreenWrapper>
  );
};

export default Restaurant;
