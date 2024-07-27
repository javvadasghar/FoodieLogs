import React, { useState, useEffect } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import Loader from "../components/loader"; // Import the Loader component
import Breadcrumb from "../components/BreadCrumb"; // Import the Breadcrumb component

const EditMenuItem: React.FC = () => {
  const [menuItem, setMenuItem] = useState<any>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false); // Add loading state
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenuItem = async () => {
      setIsLoading(true); // Set loading to true when starting the fetch request
      const userData = JSON.parse(localStorage.getItem("userData") || "");
      if (!userData) {
        navigate("/login");
        return;
      }

      const token = userData.tokens.access_token;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/menuItems/fetchMenuItem/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMenuItem(response?.data?.data);
        setName(response?.data?.data?.name);
        setRating(response?.data?.data?.rating);
        setReview(response?.data?.data?.review);
      } catch (error) {
        console.error("Error fetching menu item data:", error);
      } finally {
        setIsLoading(false); // Set loading to false after the fetch request completes
      }
    };
    fetchMenuItem();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting the update request
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const token = userData.tokens.access_token;

    const updatedMenuItem = {
      name,
      review,
      rating: rating ? rating : 4.5,
      restaurantId: menuItem?.restaurant?.id || 0,
    };

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/menuItems/editMenuItem/${id}`,
        updatedMenuItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Menu item updated successfully!");
        navigate(`/restaurants/${menuItem?.restaurant?.id}`); // Navigate to restaurant page after successful update
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
      toast.error("Failed to update menu item.");
    } finally {
      setIsLoading(false); // Set loading to false after the update request completes
    }
  };

  return (
    <>
      {isLoading && <Loader />} {/* Show loader when loading */}
      <ScreenWrapper title="Edit Menu Item">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Home", to: "/home" },
            { label: `Restaurant`, to: `/restaurant/${menuItem?.restaurant?.id}` },
            { label: "Edit Menu Item" }
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

          <div className="my-12">
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
              onClick={(rate) => setRating(rate)}
              fillColor="#E0A961"
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
          <div className="overflow-hidden flex flex-col justify-center items-center w-full">
            <button
              type="submit"
              className="w-full lg:w-2/5 px-6 py-3 bg-primary hover:bg-secondary text-white font-bold"
            >
              SUBMIT
            </button>
          </div>
          <Toaster richColors />
        </form>
      </ScreenWrapper>
    </>
  );
};

export default EditMenuItem;
