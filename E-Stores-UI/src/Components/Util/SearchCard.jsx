import React, { useState } from "react";
import { SubmitBtn } from "./Forms";

const SearchCard = ({options, closeView, setFor}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selection, setSelection] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirm = () => {
    setFor(selection);
    closeView(false);
  };

  const filteredOptions = options ? options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 font-two">
      <div className="bg-white h-3/5 rounded-lg shadow-md p-4 w-1/2 flex flex-col justify-center items-center">
        <h1 className="py-3 px-2 text-2xl font-semibold w-full">Select Product Type</h1>
        <input
          type="text"
          className="w-full p-2 border border-transparent bg-gray-100 rounded-lg mb-4 focus:outline-none focus:border-pallete_zero"
          placeholder="Search for e.g., mobile, laptop, shirt, pant, sneaker, etc.,"
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="dropdown h-full w-full overflow-y-auto mb-4">
          {searchTerm === "" ? (
            <div className="w-full text-gray-400 font-semibold h-full flex justify-center items-center">Nothing to show</div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2  cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(option)
                  setSelection(option)
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="w-full text-gray-400 font-semibold h-full flex justify-center items-center">Nothing Found 😓</div>
          )}
        </div>
        <div className="w-full mt-auto flex justify-end items-center">
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
