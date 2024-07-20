import axios from "axios";
import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

interface CardProps {
  id: number;
  title: string;
  location?: string;
  rating: number;
  review: string;
  itemCount?: number;
  link: string;
  restaurantId: number;
  favourite: boolean;
  styleExternalWidth?: string;
  updateFavoriteStatus: (restaurantId: number, isLiked: boolean) => void;
}

const Card: React.FC<CardProps> = ({
  id,
  favourite,
  title,
  location,
  review,
  rating,
  itemCount,
  restaurantId,
  styleExternalWidth,
  updateFavoriteStatus,
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(favourite);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(favourite);
  }, [favourite]);

  const handleLike = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      console.error("User is not logged in.");
      return;
    }

    const token = userData.tokens.access_token;
    const Removeurl = `${process.env.REACT_APP_API_URL}/api/restaurants/removeFavouriteRestaurant/${restaurantId}`;
    const Addurl = `${process.env.REACT_APP_API_URL}/api/restaurants/favouriteARestaurant/${restaurantId}`;
    try {
      if (isLiked) {
        await axios.post(
          Removeurl,
          { restaurantId },
          {
            headers: {
              "Content-Type": "*",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(false);
        toast.success("Restaurant Removed from Favourites!");
        updateFavoriteStatus(restaurantId, false);
      } else {
        await axios.post(
          Addurl,
          { restaurantId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsLiked(true);
        toast.success("Restaurant Added to Favourites!");
        updateFavoriteStatus(restaurantId, true);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleArrowClick = () => {
    navigate(`/restaurant/${restaurantId}`);
  };

  return (
    <div
      key={Math.random() * 10}
      className={`mb-4 bg-[#FFFFFFE6] bg-opacity-85 rounded-2xl shadow-lg ${
        styleExternalWidth ?? "w-full"
      } lg:w-1/2 p-3 overflow-hidden`}
    >
      <div className="flex flex-row justify-between font-poppins">
        {/*--- 1st column --- */}
        <div className="flex flex-col w-5/6">
          <div className="flex flex-row justify-start items-start gap-2">
            {isLiked ? (
              <GoHeartFill
                onClick={handleLike}
                size={25}
                className="text-[#C12121] cursor-pointer border-[#ECECEA] my-1"
              />
            ) : (
              <GoHeart
                size={25}
                className="text-[#B1B3B6] cursor-pointer hover:text-[#C12121] my-1"
                onClick={handleLike}
              />
            )}
            <div className="flex flex-col justify-start">
              <p className="text-2xl font-bold">{title}</p>
              <p className="text-sm my-1">{location}</p>
            </div>
          </div>
          <p className="mt-2 text-sm my-3 px-2 overflow-auto line-clamp-2 xl:line-clamp-3">
            {review}
          </p>
        </div>

        {/*--- 2nd column --- */}
        <div className="flex flex-col gap-2 mt-2 xl:mt-0 xl:ml-4 items-center">
          <div className="flex flex-row gap-1 items-center">
            <FaStar className="text-gold" size={22} />
            <p className="text-lg">{rating}</p>
          </div>
          <p className="whitespace-nowrap">{itemCount} items</p>
          <FaArrowRight
            className="text-primary border-2 border-grayDark rounded-full p-3 cursor-pointer"
            size={50}
            onClick={handleArrowClick}
          />
        </div>
      </div>
      <Toaster richColors />
    </div>
  );
};

export default Card;
