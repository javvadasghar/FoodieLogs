import React from "react";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";

const EditMenuItem: React.FC = () => {
  return (
    <>
      <ScreenWrapper title="Edit Menu Item">
        <p className="font-poppins text-lg">
          <span className="text-red-500">*</span> required
        </p>
        <div className="w-full lg:min-w-96 mx-auto  ">
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2 uppercase">
              Name
              <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
              required
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
              initialValue={4.5}
              fillColor="#E0A961"
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-bold mb-2 uppercase">
              Review And Notes
            </label>
            <textarea className="border-b border-grayDark w-full py-2 px-3 focus:outline-none" />
          </div>
        </div>
      </ScreenWrapper>
      <div className="overflow-hidden flex flex-col justify-center items-center w-full">
        <button className=" w-full lg:w-1/5  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold ">
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default EditMenuItem;
