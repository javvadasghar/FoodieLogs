import { useState, useEffect } from "react";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditMenuItem: React.FC = () => {
  const [menuItem, setmenuItem] = useState<any>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchMenuItem = async () => {
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

        setmenuItem(response?.data?.data);
        setName(response?.data?.data?.name);
        setRating(response?.data?.data?.rating);
        setReview(response?.data?.data?.review);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };
    fetchMenuItem();
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const token = userData.tokens.access_token;

    const updatedMenuItem = {
      name,
      location: menuItem?.restaurant?.location || "",
      review,
      rating: rating ? rating : 4.5,
      price: menuItem?.restaurant?.price || 0,
      features: JSON.parse(menuItem?.restaurant?.features) || [],
      categories: JSON.parse(menuItem?.restaurant?.categories) || [],
      userId: userData?.user?.id || 0,
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
        alert("Menu item updated successfully!");
        navigate("/menuItems");
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
      alert("Failed to update menu item.");
    }
  };

  return (
    <>
      <ScreenWrapper title="Edit Menu Item">
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
              className=" w-full lg:w-2/5  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold "
            >
              SUBMIT
            </button>
          </div>
        </form>
      </ScreenWrapper>
    </>
  );
};

export default EditMenuItem;
