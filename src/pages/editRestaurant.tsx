import React, { useState } from "react";
import axios from "axios";
import ScreenWrapper from "../components/screenWrapper";
import { Rating } from "react-simple-star-rating";
import SelectBoxes from "../components/selectBox";
import { Prices, Features, Category } from "../data";

const EditRestaurant = () => {
  const [price, setPrice] = useState(Prices[0]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  return (
    <>
      <ScreenWrapper title="Edit Restaurant">
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
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2 uppercase">
              Location
            </label>
            <input
              type="text"
              className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-lg font-bold mb-2 uppercase">
              Review And Notes
            </label>
            <input
              type="text"
              className="border-b border-grayDark w-full py-2 px-3 focus:outline-none"
            />
          </div>
          <div className="my-4">
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
          {/* PRICE */}
          <div className="my-4">
            <label className="block text-lg font-bold mb-2 uppercase">
              PRICE
            </label>
            <SelectBoxes
              isMultiselect={false}
              isBordered
              options={Prices}
              selectedOptions={[price]}
              onChange={(selectedPrice) => setPrice(selectedPrice[0])}
            />
          </div>

          {/* FEATURES */}
          <div className="my-4">
            <label className="block text-lg font-bold mb-2 uppercase">
              FEATURES
            </label>
            <SelectBoxes
              isMultiselect={true}
              isBordered={false}
              options={Features}
              selectedOptions={selectedFeatures}
              onChange={setSelectedFeatures}
            />
          </div>

          {/* CATEGORY */}
          <div className="my-4">
            <label className="block text-lg font-bold mb-2 uppercase">
              CATEGORY
            </label>
            <SelectBoxes
              isMultiselect={true}
              isBordered={false}
              options={Category}
              selectedOptions={selectedCategories}
              onChange={setSelectedCategories}
            />
          </div>
        </div>
      </ScreenWrapper>
      <div className="overflow-hidden flex flex-col justify-center items-center w-full">
        <button className=" w-full lg:w-1/4  px-6 py-3 bg-primary hover:bg-secondary text-white font-bold ">
          SUBMIT
        </button>
      </div>
    </>
  );
};

export default EditRestaurant;
