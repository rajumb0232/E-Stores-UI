import React, { useEffect, useState } from "react";
import { ImEye } from "react-icons/im";
import { TbEyeClosed } from "react-icons/tb";

const Input = ({
  type,
  name,
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
    if (showSensitive) setInputType("text");
    else setInputType(type);
  }, [showSensitive]);

  return (
    // <div className="w-full flex flex-col justify-center items-start">
    //   <label htmlFor={name} className="px-2 py-0.5 text-base font-medium text-slate-600">{name + ": "}</label>
      <div className="border border-transparent rounded-md bg-input_blue w-full text-sm px-2 hover:border-slate-400 focus-within:border-slate-400 flex justify-center items-center">
        <input
          id={name}
          type={inputType}
          onChange={(event) => onChangePerform(event.target.value)}
          required={isRequired}
          placeholder={placeholderText}
          value={value ? value : ""}
          className="rounded-md bg-transparent w-full py-2 text-base placeholder:font-normal text-slate-700 placeholder:text-slate-500"
        />
        {isSecure && (
          <div
            className="border-l border-l-slate-300 pl-1"
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
    // </div>
  );
};

export default Input;
