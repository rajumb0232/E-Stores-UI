import React from "react";

const Input = ({value, onChangePerform, isRequired, placeholderText}) => {
  return (
    <input
      type="text"
      onChange={(event) => onChangePerform(event.target.value)}
      required={isRequired}
      placeholder={placeholderText}
      value={value? value : ""}
      className="border-2 border-transparent rounded-md bg-gray-100 w-full py-2  px-2 text-base hover:border-gray-300 focus:border-gray-300 placeholder:text-slate-500"
    />
  );
};

export default Input;
