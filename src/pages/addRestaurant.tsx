import React, { useState, useEffect } from "react";
import axios from "axios";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import { Toaster, toast } from "sonner";
import SelectBoxes from "../components/selectBox";
import { Prices, Features, Category } from "../data";
import { useNavigate } from "react-router-dom";

const AddRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(Prices[0]); // Default to first price option
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const navigate = useNavigate();

  const priceMapping:any = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
  };

  const handleRating = (rate: any) => {
    ;
    setRating(rate);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    ;
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
      return;
    }
    const token = userData.tokens.access_token;

    const restaurantData = {
      name,
      location,
      review,
      rating,
      price: priceMapping[price], 
      features: selectedFeatures,
      categories: selectedCategories,
      userId,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/restaurants/addRestaurant`,
        restaurantData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      ;
      toast.success("Restaurant Added Successfully");
      navigate("/home");
      // Handle success (e.g., redirect to a new page or show a success message)
    } catch (error) {
      console.error("There was an error adding the restaurant:", error);
      // Handle error (e.g., show an error message)
    }
  };
  return (
    <>
      <ScreenWrapper title="Add a Restaurant">
        <form onSubmit={handleSubmit}>
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
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2 uppercase">
                Location
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-lg font-bold mb-2 uppercase">
                Review And Notes
              </label>
              <input
                type="text"
                className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="my-4">
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
                initialValue={4.5}
                fillColor="#E0A961"
                onClick={handleRating}
              />
            </div>
            {/* PRICE */}
            <div className="my-4">
              <label className="block text-lg font-bold mb-2 uppercase">
                PRICE
                <span className="text-red-500">*</span>
              </label>
              <SelectBoxes
                isMultiselect={false}
                isBordered
                options={Prices}
                selectedOptions={[price]}
                onChange={(selectedPrice) => setPrice(selectedPrice[0])}
              />
            </div>

            {/* FEATURES */}
            <div className="my-4">
              <label className="block text-lg font-bold mb-2 uppercase">
                FEATURES
                <span className="text-red-500">*</span>
              </label>
              <SelectBoxes
                isMultiselect={true}
                isBordered={false}
                options={Features}
                selectedOptions={selectedFeatures}
                onChange={setSelectedFeatures}
              />
            </div>

            {/* CATEGORY */}
            <div className="my-4">
              <label className="block text-lg font-bold mb-2 uppercase">
                CATEGORY
                <span className="text-red-500">*</span>
              </label>
              <SelectBoxes
                isMultiselect={true}
                isBordered={false}
                options={Category}
                selectedOptions={selectedCategories}
                onChange={setSelectedCategories}
              />
            </div>
          </div>
          <div className="overflow-hidden flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className=" w-full lg:w-1/4  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold "
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

export default AddRestaurant;
