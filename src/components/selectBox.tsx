import React, { useState } from "react";

interface SelectBoxesProps {
  options: string[];
  isBordered: boolean;
  isMultiselect: boolean;
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const SelectBoxes: React.FC<SelectBoxesProps> = ({
  options,
  isBordered,
  isMultiselect,
  selectedOptions,
  onChange,
}) => {
  const generateUniqueId = (option: string) => {
    return option.replace(/\s+/g, "-").toLowerCase();
  };

  const handleOptionSelect = (option: string) => {
    let newSelectedOptions;
    if (isMultiselect) {
      // If multiselect is enabled, toggle the selection of options
      if (selectedOptions.includes(option)) {
        newSelectedOptions = selectedOptions.filter((item) => item !== option);
      } else {
        newSelectedOptions = [...selectedOptions, option];
      }
    } else {
      // If multiselect is disabled, select only the clicked option
      newSelectedOptions = [option];
    }
    onChange(newSelectedOptions);
  };

  return (
    <div className="flex flex-wrap  mt-3">
      {options.map((option, index) => (
        <div
          key={generateUniqueId(option)}
          className={` px-6 py-2 cursor-pointer mr-4 mb-2 min-w-16 text-center font-poppins ${
            isBordered ? "border border-primary rounded-3xl" : ""
          } ${
            selectedOptions.includes(option)
              ? "bg-primary text-white border border-primary rounded-3xl font-poppins"
              : ""
          }`}
          onClick={() => handleOptionSelect(option)}
        >
          <p className="text-center font-poppins">{option}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectBoxes;
