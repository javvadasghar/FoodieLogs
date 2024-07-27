import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import SelectBoxes from "../components/selectBox";
import { Prices, Features, Category } from "../data";
import { Toaster, toast } from "sonner";
import Loader from "../components/loader"; // Import the Loader component
import Breadcrumb from "../components/BreadCrumb"; // Import the Breadcrumb component

const EditRestaurant = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState(Prices[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const priceMapping: any = {
    $: 1,
    $$: 2,
    $$$: 3,
    $$$$: 4,
  };

  const reversePriceMapping: any = {
    1: "$",
    2: "$$",
    3: "$$$",
    4: "$$$$",
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch request
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/restaurants/fetchRestaurant/${id}`
        );
        const data = response?.data?.data?.restaurant;
        setName(data?.name);
        setLocation(data?.location);
        setReview(data?.review);
        setRating(data?.rating);
        setPrice(reversePriceMapping[data?.price] || Prices[0]);
        setSelectedFeatures(JSON.parse(data?.features || "[]"));
        setSelectedCategories(JSON.parse(data?.categories || "[]"));
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the fetch request completes
      }
    };
    fetchRestaurant();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting the update request
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
      return;
    }

    const token = userData.tokens.access_token;
    const updatedRestaurant = {
      name,
      location,
      review: review ? review : "",
      rating: rating ? rating : 4.5,
      price: price ? priceMapping[price] : 1,
      features: selectedFeatures,
      categories: selectedCategories,
      userId: userData?.user?.id || 0,
    };

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/restaurants/editRestaurant/${id}`,
        updatedRestaurant,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Restaurant Updated Successfully");
        navigate(`/restaurant/${id}`);
      }
    } catch (error) {
      console.error("Error updating restaurant:", error);
      toast.error("Failed to update restaurant.");
    } finally {
      setIsLoading(false); // Set loading to false after the update request completes
    }
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when loading */}
      <ScreenWrapper title="Edit Restaurant">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/home" },
            { label: `Restaurant`, to: `/restaurant/${id}` }, // Dynamic link to the restaurant page
            { label: "Edit Restaurant" }
          ]}
        />

        <p className="font-poppins text-lg">
          <span className="text-red-500">*</span> required
        </p>
        <form className="w-full lg:min-w-96 mx-auto" onSubmit={handleSubmit}>
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
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
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
              initialValue={rating}
              fillColor="#E0A961"
              onClick={(rate) => setRating(rate)}
            />
          </div>
          {/* PRICE */}
          <div className="my-4">
            <label className="block text-lg font-bold mb-2 uppercase">
              PRICE
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
            </label>
            <SelectBoxes
              isMultiselect={true}
              isBordered={false}
              options={Category}
              selectedOptions={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
          <div className="overflow-hidden flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className=" w-full lg:w-2/4  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold "
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

export default EditRestaurant;
