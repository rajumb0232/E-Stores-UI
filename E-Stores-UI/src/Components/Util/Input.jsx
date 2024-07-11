import React, { useEffect, useState } from "react";
import { ImEye } from "react-icons/im";
import { TbEyeClosed } from "react-icons/tb";

const Input = ({
  type,
  value,
  onChangePerform,
  isRequired,
  placeholderText,
}) => {
  const [isSecure, setSecure] = useState(false);
  const [showSensitive, setShowSensitive] = useState(false);
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    console.log(type);
    if (type === "password") setSecure(true);
  }, []);

  useEffect(() => {
    if(showSensitive) setInputType("text");
    else setInputType(type)
  },[showSensitive])

  return (
    <div className="border-2 border-transparent rounded-md bg-gray-100 w-full text-sm px-2 hover:border-gray-300 focus:border-gray-300 placeholder:text-slate-500 flex justify-center items-center">
      <input
        type={inputType}
        onChange={(event) => onChangePerform(event.target.value)}
        required={isRequired}
        placeholder={placeholderText}
        value={value ? value : ""}
        className="rounded-md bg-gray-100 w-full py-3 px-2 placeholder:text-slate-500"
      />
      {isSecure && (
        <div
          onClick={() =>
            showSensitive ? setShowSensitive(false) : setShowSensitive(true)
          }
        >
          {showSensitive ? (
            <ImEye className="text-slate-600" />
          ) : (
            <TbEyeClosed className="text-slate-600" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
