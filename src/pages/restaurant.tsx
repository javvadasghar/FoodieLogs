import React, { useState, useEffect } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { FaSearch } from "react-icons/fa";
import CustomFilterDropdown from "../components/filters";
import Card from "../components/menuCard";
import { FaStar } from "react-icons/fa6";
import { BiSolidPencil } from "react-icons/bi";
import { Link, useParams } from "react-router-dom";
import "../../src/index.css";
import axios from "axios";
import { Toaster, toast } from "sonner";
import Loader from "../components/loader"; // Import the loader component
import Breadcrumb from "../components/BreadCrumb"; // Import the Breadcrumb component

const Restaurant: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState("Menu");
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOption, setFilterOption] = useState("");
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    handleSearch();
  }, [filterOption, searchQuery]);

  const handleSearch = async () => {
    setIsLoading(true); // Set loading to true when starting the request
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      return;
    }

    const userId = userData?.user?.id;
    const params = new URLSearchParams();
    if (id) params.append("restaurantId", id);
    if (userId) params.append("userId", userId);
    if (searchQuery) params.append("searchQuery", searchQuery);

    // Construct URL with sorting options
    let url = `${process.env.REACT_APP_API_URL}/api/menuItems/fetchRestaurantMenuItems/${id}`;

    // Append query parameters
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    // Apply sorting based on filterOption
    if (filterOption) {
      switch (filterOption) {
        case "SORT A-Z":
          url += `${
            params.toString() ? "&" : "?"
          }filterOption=alphabetical&filterOrder=ASC`;
          break;
        case "SORT Z-A":
          url += `${
            params.toString() ? "&" : "?"
          }filterOption=alphabetical&filterOrder=DESC`;
          break;
        case "SORT RATING HIGH TO LOW":
          url += `${
            params.toString() ? "&" : "?"
          }filterOption=rating&filterOrder=DESC`;
          break;
        case "SORT RATING LOW TO HIGH":
          url += `${
            params.toString() ? "&" : "?"
          }filterOption=rating&filterOrder=ASC`;
          break;
        default:
          break;
      }
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setRestaurant(response?.data?.data?.restaurant);
      if (response?.data?.data?.restaurant?.favouritedByUser.length > 0) {
        setIsLiked(true);
      }
      setMenuItems(response?.data?.data?.menuItems);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  const handleFilterChange = (option: string) => {
    setFilterOption(option);
  };

  const handleLike = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      console.error("User is not logged in.");
      return;
    }

    const token = userData.tokens.access_token;
    const Removeurl = `${process.env.REACT_APP_API_URL}/api/restaurants/removeFavouriteRestaurant/${id}`;
    const Addurl = `${process.env.REACT_APP_API_URL}/api/restaurants/favouriteARestaurant/${id}`;
    try {
      if (isLiked) {
        await axios.post(
          Removeurl,
          { restaurantId: id },
          {
            headers: {
              "Content-Type": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(false);
        toast.success("Restaurant Removed from Favourites!");
      } else {
        await axios.post(
          Addurl,
          { restaurantId: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(true);
        toast.success("Restaurant Added to Favourites!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSearchClick = () => {
    handleSearch();
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when loading */}
      <ScreenWrapper
        title={restaurant?.name}
        isHeartVisible={true}
        handleLike={handleLike}
        isLiked={isLiked}
      >
        <div className="p-4">
        <Breadcrumb
          items={[
            { label: "Home", to: "/home" },
            { label: "Restaurant" }
          ]}
        />
      </div>
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search a Menu Item"
                  className="w-full pl-4 pr-10 py-3 border rounded-full border-gray-300 focus:outline-none focus:border-primary"
                />
                <FaSearch
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl cursor-pointer"
                  onClick={handleSearchClick}
                />
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
              onFilterChange={handleFilterChange}
            />
            {/* Menu items */}
            <div className="flex flex-col justify-center w-full items-center">
              <div className="relative flex flex-col items-center overflow-y-scroll bg-cover w-full bg-center h-full">
                {menuItems &&
                  menuItems.map((item: any) => (
                    <Card
                      key={item.id}
                      id={item.id}
                      title={item.name}
                      review={item.review}
                      rating={item.rating}
                      restaurantId={item?.id}
                      isLiked={item.favoritedBy.length > 0}
                      link="#"
                      styleExternalWidth="lg:w-full border-2 border-greyDark"
                    />
                  ))}
                {/* Add Restaurant Button */}
                <Link
                  className="w-full xl:w-4/4 py-3 px-3 bg-primary hover:bg-secondary text-white font-bold text-center"
                  to={`/restaurants/${id}/addMenuItem`}
                >
                  Add Menu Item
                </Link>
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
              <a href={`/editRestaurant/${id}`}>
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
        <Toaster richColors />
      </ScreenWrapper>
    </>
  );
};

export default Restaurant;
