import React, { useState, useEffect } from "react";
import { BiSolidPencil } from "react-icons/bi";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/loader"; // Import the Loader component
import Breadcrumb from "../components/BreadCrumb"; // Import the Breadcrumb component

const AccountSettings: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setUsername(user.userName || "");
    setEmail(user.email || "");
  }, []);

  const handleLogout = async () => {
    setIsLoading(true); // Set loading to true when starting the logout process
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
      setIsLoading(false); // Set loading to false if no user data is found
      return;
    }

    const token = userData.tokens.access_token;
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setIsLoading(false); // Set loading to false after the logout process completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins mx-8">
      {isLoading && <Loader />} {/* Show loader when loading */}
      {/* Logo */}
      <img
        src="logo.png"
        alt="main"
        width={400}
        height={400}
        className="my-6"
      />
<Breadcrumb
        items={[
          { label: "Home", to: "/home" },
          { label: "Account Settings" }
        ]}
      />
      {/* Container for Arrow and User Details */}
      <div className="w-full lg:w-2/5 xl:w-1/5">
        <div className="flex items-center mb-6 gap-10">
          <MdArrowBackIosNew
            onClick={() => navigate("/home")}
            size={26}
            className="text-black"
          />
          <h1 className="text-2xl xl:text-3xl font-bold text-center">
            Account Settings
          </h1>
        </div>

        {/* Edit Icon */}
        <div className="flex justify-center items-center my-7">
          <Link to={`/editAccount`}>
            <BiSolidPencil
              className="text-primary border-2 border-grayDark rounded-full p-2 cursor-pointer"
              size={40}
            />
          </Link>
        </div>

        {/* User Details */}
        <div className="flex flex-col items-start gap-y-8 w-full">
          <div className="flex flex-col gap-4 mb-4 w-full">
            <p className="font-bold text-2xl">USERNAME</p>
            <p className="text-sm">{username}</p>
          </div>
          <div className="flex flex-col gap-4 mb-4 w-full">
            <p className="font-bold text-2xl">EMAIL</p>
            <p className="text-sm">{email}</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="font-bold text-2xl">PASSWORD</p>
            <p className="text-sm">*********</p>
          </div>
        </div>
      </div>
      <button
        className="my-8 inline-block lg:w-1/5 bg-primary text-white font-bold font-poppins px-6 py-3 rounded-full w-full hover:bg-secondary transition-colors duration-300"
        onClick={handleLogout}
      >
        Log out
      </button>
      <Button styles="lg:w-1/5" text="CONTACT SUPPORT" />
    </div>
  );
};

export default AccountSettings;
