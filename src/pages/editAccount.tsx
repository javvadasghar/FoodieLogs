import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdArrowBackIosNew } from "react-icons/md";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EditAccount: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("userData") || "{}");
    setUsername(users?.user?.userName || "");
    setEmail(users?.user.email || "");
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmNewPassword && !existingPassword) {
      toast.error("Please enter Existing Password");
      return;
    }
    if (existingPassword && (!newPassword || !confirmNewPassword)) {
      toast.error("Please enter both new password and confirm new password.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error("New password and confirm new password do not match.");
      return;
    }
    const userData = JSON.parse(localStorage.getItem("userData") || "");
    if (!userData) {
      navigate("/login");
      return;
    }
    const token = userData.tokens.access_token;

    const payload: any = {
      userName: username,
      email: email,
    };

    if (existingPassword && newPassword) {
      payload.oldPassword = existingPassword;
      payload.newPassword = newPassword;
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/api/users/updateProfile`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const users = JSON.parse(localStorage.getItem("userData") || "{}");
        users.user.userName = username;
        users.user.email = email;
        localStorage.setItem("userData", JSON.stringify(users));
        toast.success("Profile Updated Successfully!");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen font-poppins mx-3">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src="logo.png" alt="Logo" />
        </div>

        {/* Edit Account Title with Arrow */}
        <div className="flex items-center mb-8 gap-4 font-poppins my-3">
          <MdArrowBackIosNew
            onClick={() => navigate("/accountSettings")}
            size={26}
            className="text-black mr-2"
          />
          <h1 className="text-3xl font-bold">Edit your account</h1>
        </div>

        {/* Form */}
        <form
          className="flex flex-col space-y-12 w-full max-w-xs my-8"
          onSubmit={handleSubmit}
        >
          {" "}
          {/* Adjusted margin bottom */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-black font-bold text-lg">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={existingPassword}
              onChange={(e) => setExistingPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
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
          <Toaster richColors />
        </form>
      </div>
    </>
  );
};

export default EditAccount;
