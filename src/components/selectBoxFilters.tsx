import React, { useState } from "react";
import { Prices, Features, Category } from "../data";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type FilterOption = {
  [key: string]: string[];
};

type FilterItem = {
  type: string;
  value: string;
};

interface SelectBoxFiltersProps {
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

const SelectBoxFilters: React.FC<SelectBoxFiltersProps> = ({ setFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (filter: string, option: string) => {
    const filterType = filter.toLowerCase();
    const updatedOptions = { ...selectedOptions, [filterType]: option };
    setSelectedOptions(updatedOptions);
    const filtersArray = Object.entries(updatedOptions).map(
      ([type, value]) => ({ type, value })
    );
    setFilters(filtersArray);
  };

  const filters: string[] = ["CATEGORY", "LOCATION", "FEATURES", "PRICE"];
  const options: FilterOption = {
    CATEGORY: Category,
    LOCATION: ["Option A", "Option B", "Option C"],
    FEATURES: Features,
    PRICE: Prices,
  };

  return (
    <div className="flex flex-col items-center text-primary gap-6 relative z-50">
      <div className="flex items-center transition-transform duration-300">
        <p className="text-lg font-bold">FILTERS</p>
        <button
          onClick={toggleDropdown}
          className={`ml-2 flex items-center focus:outline-none transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          {isOpen ? (
            <IoIosArrowUp size={25} className="transform" />
          ) : (
            <IoIosArrowDown size={25} className="transform" />
          )}
        </button>
      </div>
      <div
        className={`w-full mt-2 ${
          isOpen
            ? "opacity-100 max-h-screen transition-opacity transition-max-h duration-300"
            : "opacity-0 max-h-0 overflow-hidden"
        }`}
      >
        {isOpen && (
          <div className="p-4 flex flex-col items-center">
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`py-2 px-6 rounded-full border font-poppins font-bold text-sm ${
                    selectedFilter === filter
                      ? "bg-primary text-white border-primary"
                      : "bg-white bg-opacity-75 text-primary border-primary"
                  }`}
                  onClick={() => setSelectedFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>

            {selectedFilter && (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 justify-center w-full max-h-40 overflow-y-auto font-poppins text-sm">
                {options[selectedFilter].map((option) => (
                  <button
                    key={option}
                    className={`py-2 px-6 rounded-full max-h-12 ${
                      selectedOptions[selectedFilter.toLowerCase()] === option
                        ? "bg-primary text-white border border-primary"
                        : "text-customBlack bg-white bg-opacity-75"
                    }`}
                    onClick={() => handleOptionClick(selectedFilter, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectBoxFilters;
