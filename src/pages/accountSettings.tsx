import React from "react";
import { BiSolidPencil } from "react-icons/bi";
import { MdArrowBackIosNew } from "react-icons/md";
import Button from "../components/button";

const AccountSettings: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-poppins mx-8 ">
      {/* Logo */}
      <img
        src="logo.png"
        alt="main"
        width={400}
        height={400}
        className=" my-6"
      />

      {/* Container for Arrow and User Details */}
      <div className="w-full lg:w-2/5 xl:w-1/5 ">
        <div className="flex items-center mb-6 gap-10">
          <MdArrowBackIosNew size={26} className="text-black  " />
          <h1 className="text-2xl xl:text-3xl font-bold text-center">
            Account Settings
          </h1>
        </div>

        {/* Edit Icon */}
        <div className="flex justify-center items-center my-7">
          <BiSolidPencil
            className="text-primary border-2 border-grayDark rounded-full p-2 cursor-pointer"
            size={40}
          />
        </div>

        {/* User Details */}
        <div className="flex flex-col items-start gap-y-11 w-full">
          <div className="flex flex-col gap-4 mb-4 w-full">
            <p className="font-bold text-2xl">USERNAME</p>
            <p className="text-sm">johnDoe</p>
          </div>
          <div className="flex flex-col gap-4 mb-4 w-full">
            <p className="font-bold text-2xl">EMAIL</p>
            <p className="text-sm">johnDoe@gmail.com</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="font-bold text-2xl">PASSWORD</p>
            <p className="text-sm">*********</p>
          </div>
        </div>
      </div>
      <Button styles="my-24 lg:w-1/5" text="CONTACT SUPPORT" />
    </div>
  );
};

export default AccountSettings;
