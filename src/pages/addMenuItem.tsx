import React, { useState } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Loader from "../components/loader"; // Import the Loader component

const AddMenuItem: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [name, setName] = useState<string>("");
  const [rating, setRating] = useState<number>(4.5);
  const [review, setReview] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state
  const navigate = useNavigate();

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when starting the request
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
      return;
    }
    const token = userData.tokens.access_token;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/menuItems/addMenuItem`,
        {
          name,
          review,
          rating: rating ? rating : 4.5,
          restaurantId: Number(restaurantId),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Menu Item Added Successfully");
      setName("");
      setReview("");
      setRating(4.5);
    } catch (error) {
      console.error("Error adding menu item:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the request completes
    }
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when loading */}
      <ScreenWrapper title="Add Menu Item">
        <form onSubmit={handleSubmit} className="w-full lg:min-w-96 mx-auto">
          <p className="font-poppins text-lg">
            <span className="text-red-500">*</span> required
          </p>
          <div className="w-full lg:min-w-96 mx-auto  ">
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2 uppercase">
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className=" my-12">
              <label className="block text-lg font-bold mb-2 uppercase">
                Rating
                <span className="text-red-500">*</span>
              </label>
              <Rating
                size={50}
                transition
                allowFraction
                SVGstyle={{
                  display: "inline",
                }}
                initialValue={rating}
                fillColor="#E0A961"
                onClick={handleRating}
              />
            </div>

            <div className="mb-6">
              <label className="block text-lg font-bold mb-2 uppercase">
                Review And Notes
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
              />
            </div>
          </div>

          <div className="overflow-hidden flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className=" w-full lg:w-2/5  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold "
            >
              SUBMIT
            </button>
            <Toaster richColors />
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
};

export default AddMenuItem;
