import React, { useState } from "react";
import { SubmitBtn } from "./Forms";

const SearchCard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [options] = useState([
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
    "Option 1",
    "Option 2",
    "Option 3",
    "Option 4",
  ]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleConfirm = () => {
    // Handle confirm action
    console.log("Confirmed: ", selectedOptions);
  };

  const handleAdd = () => {
    // Handle add action
    console.log("Add button clicked");
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-md p-4 w-1/2">
        <div className="mb-4">
          {selectedOptions.map((option, index) => (
            <span
              key={index}
              className="inline-block bg-pallete_one font-semibold border border-pallete_zero text-xs p-2 rounded-full mr-2 mb-2"
            >
              {option}
            </span>
          ))}
        </div>
        <input
          type="text"
          className="w-full p-2 border border-gray-500 bg-gray-100 rounded-lg mb-4 focus:outline-none focus:border-pallete_zero"
          placeholder="Search for e.g., mobile, laptop, shirt, pant, sneaker, etc.,"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="dropdown max-h-48 overflow-y-auto mb-4">
          {searchTerm === "" ? (
            <div className="text-pallete_zero w-full text-center">Start typing...</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2  cursor-pointer hover:bg-gray-100"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="text-pallete_zero  w-full text-center">No matching options</div>
          )}
        </div>
        <div className="flex justify-end items-center">
          <div className="w-max m-2">
            <SubmitBtn
              onClick={handleConfirm}
              btnType={"button"}
              name={"Confirm"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
