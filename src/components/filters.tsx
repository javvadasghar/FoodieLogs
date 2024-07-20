import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface FilterProps {
  options: string[];
  filterTitle?: string;
  onFilterChange: (option: string) => void;
}

const CustomFilterDropdown: React.FC<FilterProps> = ({
  options,
  filterTitle = "FILTER",
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onFilterChange(option);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center text-primary gap-6 relative z-50">
      <div className="flex items-center transition-transform duration-300">
        <p className="text-sm font-bold">{filterTitle}</p>
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
          <div className="w-full">
            {options.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer font-bold text-primary text-center"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomFilterDropdown;
