import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat ">
      <div className="max-w-md mx-auto text-center bg-white bg-opacity-90 p-8 rounded-lg shadow-lg border-2">
        <img className=" w-full h-48 " src="Main-page-bg.jpg" alt="bg-img" />
        <div className="text-9xl font-bold text-primary font-poppins">404</div>
        <h1 className="text-4xl font-bold text-customBlack mb-6">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 font-poppins ">
          The page you're looking for doesn't exist. Don't worry, we'll help you
          find your way back home.
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white font-bold font-poppins px-6 py-3 rounded-full w-full hover:bg-secondary transition-colors duration-300"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
