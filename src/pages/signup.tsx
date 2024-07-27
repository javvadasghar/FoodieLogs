import React, { useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader"; // Import the Loader component

const SignUp: React.FC = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  
  interface ErrorResponse {
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Set loading to true when starting the signup process

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName, email, password, confirmPassword }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message);
        setIsLoading(false); // Set loading to false if the response is not okay
        return;
      }

      toast.success("User Created Successfully");
      navigate("/home");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false); // Set loading to false after the signup process completes
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {isLoading && <Loader />} {/* Show loader when loading */}
      {/* banner container */}
      <div className="container flex flex-col justify-center items-center w-full my-6">
        <img src="logo.png" alt="main" />
        {/* create account text */}

        {/* form container */}
        <div className="w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center gap-5 px-3">
          <div className="flex items-center my-10 relative">
            <MdArrowBackIosNew
              onClick={() => navigate("/login")}
              size={26}
              className=" text-black text-3xl absolute right-72 xl:right-80  "
            />
            <h1 className="text-3xl font-bold font-poppins">
              Create an Account
            </h1>
          </div>
          {/* username input */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
            <div className="relative w-full">
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-3 border rounded-full border-grayDark focus:outline-none focus:border-gray-500"
                type="text"
                placeholder="Username"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            {/* email input */}
            <div className="relative w-full">
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-3 border rounded-full border-grayDark focus:outline-none focus:border-gray-500"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* password input */}
            <div className="relative w-full">
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-3 border rounded-full border-grayDark focus:outline-none focus:border-gray-500"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {/* confirm password input */}
            <div className="relative w-full">
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-3 border rounded-full border-grayDark focus:outline-none focus:border-gray-500"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <p className="font-poppins text-lg text-customBlack text-center mt-4">
              By creating an account you agree to our{" "}
              <a href="/termsAndConditions">
                <span className="text-primary underline">Terms of Service</span>
              </a>
            </p>
            <button
              className="inline-block bg-primary text-white font-bold font-poppins px-6 py-3 rounded-full w-full hover:bg-secondary transition-colors duration-300"
              type="submit"
            >
              SIGN UP
            </button>
            <Toaster richColors />
          </form>
          <p className="font-poppins text-lg text-customBlack text-center">
            Already have an account?{" "}
            <a href="/login">
              {" "}
              <span className="text-primary underline">
                <br />
                login
              </span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
