import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "../components/button";

const EditAccount: React.FC = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen font-poppins mx-3">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="logo.png" alt="Logo" />
        </div>

        {/* Edit Account Title with Arrow */}
        <div className="flex items-center mb-8 gap-4 font-poppins my-3">
          <MdArrowBackIosNew size={26} className="text-black mr-2" />
          <h1 className="text-3xl font-bold">Edit your account</h1>
        </div>

        {/* Form */}
        <form className="flex flex-col space-y-12 w-full max-w-xs my-8">
          {" "}
          {/* Adjusted margin bottom */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-black font-bold text-lg">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="border-b border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-black font-bold text-lg">
              EMAIL
            </label>
            <input
              type="email"
              id="email"
              className="border-b border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="existingPassword"
              className="text-black font-bold text-lg"
            >
              EXISTING PASSWORD
            </label>
            <input
              type="password"
              id="existingPassword"
              className="border-b border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="newPassword"
              className="text-black font-bold text-lg"
            >
              NEW PASSWORD
            </label>
            <input
              type="password"
              id="newPassword"
              className="border-b border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="flex flex-col">
            <label
              htmlFor="confirmNewPassword"
              className="text-black font-bold text-lg"
            >
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="border-b border-gray-300 focus:outline-none focus:border-primary"
            />
          </div>
          <div className="overflow-hidden hidden justify-center w-full  lg:flex">
            {" "}
            {/* Adjusted margin bottom */}
            <button className="w-full px-6 py-3 bg-primary hover:bg-secondary text-white font-bold">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <div className="overflow-hidden flex justify-center w-full  lg:hidden">
        {" "}
        {/* Adjusted margin bottom */}
        <button className="w-full px-6 py-3 bg-primary hover:bg-secondary text-white font-bold">
          SUBMIT
        </button>
      </div>

      {/* Button */}
    </>
  );
};

export default EditAccount;
