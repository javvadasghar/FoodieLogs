import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface ScreenWrapperProps {
  title: string;
  titleSize?: string;
  children?: React.ReactNode;
  isHeartVisible?: boolean;
  isLiked?: boolean;
  handleLike?: () => void;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  title,
  titleSize,
  children,
  isHeartVisible = false,
  isLiked,
  handleLike,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* banner container */}
      <div className="container flex flex-col justify-center items-center w-full my-6">
        {/* form container */}
        <div className="w-10/12 md:w-1/2 lg:w-1/3 xl:w-1/4 flex flex-col justify-center items-center gap-5 px-3">
          <div className="flex items-center my-10">
            <MdArrowBackIosNew
              onClick={handleBackClick}
              size={26}
              className="text-black text-3xl mr-4"
            />
            <h1
              className={`${
                titleSize ?? "text-3xl"
              } font-bold font-poppins whitespace-nowrap`}
            >
              {title}
            </h1>
            {isHeartVisible && handleLike && (
              <div className="ml-4">
                {isLiked ? (
                  <GoHeartFill
                    onClick={handleLike}
                    size={25}
                    className="text-[#C12121] cursor-pointer border-[#ECECEA] my-1"
                  />
                ) : (
                  <GoHeart
                    onClick={handleLike}
                    size={25}
                    className="text-[#B1B3B6] cursor-pointer hover:text-[#C12121] my-1"
                  />
                )}
              </div>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScreenWrapper;
