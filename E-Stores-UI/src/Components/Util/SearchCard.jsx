import React, { useState } from "react";
import { SubmitBtn } from "./Forms";
import { IoSearchOutline } from "react-icons/io5";

const SearchCard = ({ options, viewOn, setFor }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selection, setSelection] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleConfirm = () => {
    setFor(selection);
    viewOn(false);
  };

  const handleClose = () => {
    viewOn(false);
  };

  const filteredOptions = options
    ? options.filter((option) =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 font-two">
      <div className="bg-white h-3/5 rounded-md shadow-md w-1/2 flex flex-col justify-center items-center border border-slate-400">
        <div className="w-full px-2 bg-gray-100 mb-4 border-b border-slate-400 rounded-t-md flex items-center justify-center">
          <div className="text-2xl text-slate-500">
            <IoSearchOutline />
          </div>
          <input
            type="text"
            placeholder="Search for types, e.g., mobile, laptop, shirt, pant, sneaker, etc.,"
            className="border-0 rounded-xl bg-transparent placeholder:text-slate-500 hover:placeholder:text-slate-500 h-full px-2 py-4 w-full text-gray-700"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="dropdown h-full w-full overflow-y-auto mb-4">
          {searchTerm === "" ? (
            <div className="w-full text-gray-400 font-semibold h-full flex justify-center items-center">
              Nothing to show
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="p-2  cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSearchTerm(option);
                  setSelection(option);
                }}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="w-full text-gray-400 font-semibold h-full flex justify-center items-center">
              Nothing Found 😓
            </div>
          )}
        </div>
        <div className="w-full mt-auto flex justify-end items-center">
          <div className="w-max m-2">
            <SubmitBtn
              onClick={handleClose}
              btnType={"button"}
              name={"Close"}
            />
          </div>
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
