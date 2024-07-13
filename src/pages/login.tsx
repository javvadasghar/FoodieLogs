import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { AxiosError } from "axios";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  interface ErrorResponse {
    message: string;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/signin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!response.ok) {
        const responseData = await response.json();
        toast.error(responseData.message);
        return;
      }
      const responseData = await response.json();
      localStorage.setItem("userData", JSON.stringify(responseData.data));
      toast.success("Login Successfully!");
      navigate("/home");
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      toast.error(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-full   ">
      {/* banner container */}
      <div className="container flex flex-col justify-center items-center w-full">
        <img
          className=" border-b-[13px]  border-b-primary"
          src="Sign-In-Logo.jpg"
          alt="main"
        />

        {/* form container */}
        <div className=" w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center my-12  gap-y-4 px-3 ">
          {/* email input */}
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-y-5"
          >
            <div className="relative w-full ">
              <FaEnvelope className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-2 border-b border-grayDark focus:outline-none focus:border-gray-500 "
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            {/* password input */}
            <div className="relative w-full ">
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-10 text-lg font-normal font-poppins py-2 border-b border-grayDark focus:outline-none focus:border-gray-500 "
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="inline-block bg-primary text-white font-bold font-poppins px-6 py-3 rounded-full w-full hover:bg-secondary transition-colors duration-300"
              type="submit"
            >
              LOG IN
            </button>
            <Toaster richColors />
          </form>
          <p className=" font-poppins text-lg text-customBlack text-center ">
            {" "}
            Don&apos;t Have an account?{" "}
            <a href="/signup">
              <span className="text-primary underline ">Register</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
