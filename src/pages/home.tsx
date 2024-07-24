import React, { useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import Card from "../components/card";
import SelectBoxFilters from "../components/selectBoxFilters";
import axios from "axios";

type FilterItem = {
  type: string;
  value: string;
};

type Restaurant = {
  id: number;
  name: string;
  location: string;
  review: string;
  rating: number;
  favouritedByUser: string[];
  menuItemsCount: number;
};

const Home = () => {
  const [AllRestaurants, setAllRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchInput(query);
    setSearchQuery(query);
  };

  useEffect(() => {
    getAllResturants();
  }, [searchQuery, filters]);

  const getAllResturants = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      return;
    }
    const userId = userData?.user?.id;

    const params = new URLSearchParams();
    if (userId) params.append("userId", userId);
    if (searchQuery) params.append("searchQuery", searchQuery);
    if (filters.length > 0) params.append("filters", JSON.stringify(filters));

    const url = `${
      process.env.REACT_APP_API_URL
    }/api/restaurants/fetchMyRestaurants/${userId}?${params.toString()}`;

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setAllRestaurants(response.data?.data || []);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateFavoriteStatus = (restaurantId: number, isLiked: boolean) => {
    setAllRestaurants((prevRestaurants) =>
      prevRestaurants.map((restaurant) =>
        restaurant.id === restaurantId
          ? { ...restaurant, favouritedByUser: isLiked ? ["liked"] : [] }
          : restaurant
      )
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins">
      <div className="container flex flex-col justify-center items-center w-full mt-9 ">
        <img src="logo.png" alt="main" />
        <div className="flex items-center w-full max-w-md mt-10 px-5">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search Your Restaurants"
              value={searchInput}
              onChange={handleSearch}
              className="w-full pl-4 pr-10 py-4 border rounded-full border-gray-300 focus:outline-none focus:border-primary"
            />
            <FaSearch
              onClick={() => getAllResturants()}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary text-xl"
            />
          </div>
          <div className="ml-4 p-2 border rounded-full border-primary">
            <a href="/accountSettings">
              <MdPerson className="text-4xl text-primary cursor-pointer" />
            </a>
          </div>
        </div>

        <div
          className="relative mt-10 flex border-t rounded-lg flex-col items-center overflow-y-scroll p-4 bg-cover bg-center w-full h-full xl:w-3/4 "
          style={{
            backgroundImage: 'url("/Main-page-bg.jpg")',
          }}
        >
          <div className="flex flex-row justify-center items-center gap-6 my-7">
            <SelectBoxFilters setFilters={setFilters} />
          </div>
          {AllRestaurants &&
            AllRestaurants.map((i) => (
              <Card
                key={i.id}
                favourite={i.favouritedByUser.length > 0}
                id={i.id}
                title={i.name}
                location={i.location}
                review={i.review}
                rating={i.rating}
                restaurantId={i.id}
                itemCount={i.menuItemsCount}
                link={`/restaurant/${i.id}`}
                updateFavoriteStatus={updateFavoriteStatus}
              />
            ))}
          <a
            className="w-full text-center xl:w-1/4 py-3 bg-primary hover:bg-secondary text-white font-bold sticky bottom-0 mb-0"
            href="/addRestaurant"
          >
            Add Restaurant
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
