import React, { useEffect, useRef, useState } from "react";
import { ImEye } from "react-icons/im";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiLoader4Fill } from "react-icons/ri";
import { RxCheck, RxCross2 } from "react-icons/rx";
import { TbEyeClosed } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export const Input = ({
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
    if (type === "password") setSecure(true);
  }, []);

  useEffect(() => {
    if (showSensitive) setInputType("text");
    else setInputType(type);
  }, [showSensitive]);

  return (
    <div className="border border-gray-300 rounded-md w-full text-sm px-2 mb-2.5 hover:border-slate-400 focus-within:border-slate-400 flex justify-center items-center">
      <input
        name={name}
        type={inputType}
        onChange={(e) => onChangePerform(e.target.value)}
        required={isRequired}
        placeholder={placeholderText}
        value={value}
        className="rounded-md bg-transparent w-full py-2.5 text-base placeholder:font-normal text-slate-700 placeholder:text-slate-500"
      />
      {isSecure && (
        <div
          className="border-l border-l-slate-300 pl-1"
          onClick={() =>
            setShowSensitive(!showSensitive) 
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

export const FormHeader = ({ icon, text }) => {
  return (
    <h1 className="text-slate-700 font-semibold text-4xl my-8 flex justify-start w-full">
      <div className="mt-1 mr-2">{icon}</div>
      {text}
    </h1>
  );
};

export const SubmitBtn = ({ onClick, btnType, isSubmited, name, icon, danger }) => {
  return (
    <button
      disabled={isSubmited}
      className={` font-bold rounded-full w-full min-w-32 px-4 py-2 border transition-colors duration-75 ease-in-out ${
        // applies for danger buttons
        danger &&
        "border-pallete_four hover:bg-pallete_four hover:text-white bg-transparent text-danger"
      }  ${
        // appies when submitted
        isSubmited
          ? "bg-transparent hover:bg-transparent bg-pallete_two border-transparent"
          : !danger &&
            "bg-pallete_zero text-slate-100 hover:text-pallete_zero hover:bg-white border-pallete_zero focus:bg-pallete_zero focus:text-white"
      }`}
      type={btnType}
      onClick={onClick}
    >
      {isSubmited ? (
        <div className="flex">
          <div className="text-lg animate-spin">
            <RiLoader4Fill />
          </div>
          <span className="font-medium font-mono text-xs ml-2 text-slate-700">
            please wait...
          </span>
        </div>
      ) : (
        <div>
          {icon && <span className="mr-2">{icon}</span>}
          <span>{name}</span>
        </div>
      )}
    </button>
  );
};

export const RadioBtn = ({ value, onChange, state }) => {
  return (
    <div className="w-max font-semibold text-slate-700">
      <div className="w-full flex justify-center items-center">
        <p className="text-base">{value}</p>
        <div className="w-12 flex justify-start items-center">
          <button
            className={`ml-2 h-max w-9 p-0.5 text-base border border-transparent flex items-center justify-center rounded-3xl transition-transform duration-500 overflow-clip ${
              state ? "bg-pallete_one" : "bg-gray-300"
            }`}
            onClick={() => onChange()}
            type="button"
          >
            <div
              className={`h-4 w-4 rounded-full bg-white border border-gray-500 text-sm font-extrabold transition-transform duration-300 ${
                state
                  ? "text-gray-500 translate-x-2/4"
                  : " text-gray-500 -translate-x-2/4"
              }`}
            >
              {state ? <RxCheck /> : <RxCross2 />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export const NavigateBtn = ({ name, icon, to, dark }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`w-max p-1.5 px-3 my-2 rounded-full flex justify-center items-center border-pallete_zero border ${
        dark
          ? "text-white bg-pallete_zero hover:bg-white hover:text-pallete_zero"
          : "text-pallete_zero bg-white hover:bg-pallete_zero hover:text-white"
      }`}
      type="button"
      onClick={() => navigate(to)}
    >
      <span>{icon}</span>
      <span className="px-1 text-base">{name}</span>
    </button>
  );
};

export function DropDown({
  valueType,
  value,
  setter,
  DefaultText,
  warnMessage,
  options,
}) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropDownRef = useRef(null);

  // closing dropdown whenever the user makes a random click
  document.addEventListener("mousedown", (e) => {
    if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
      setDropdownOpen(false);
    }
  });

  return (
    <div className="w-full mx-2 mb-2.5">
      <button
        type="button"
        className="w-full py-2.5 px-2 font-semibold text-slate-700 bg-pallete_one rounded-md"
        onClick={() => {
          isDropdownOpen ? setDropdownOpen(false) : setDropdownOpen(true);
        }}
      >
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex justify-center items-center w-max">
            <p className="line-clamp-1">
              {value !== "" && value ? valueType + ": " + value : DefaultText}
            </p>
            <div className="ml-1">
              {isDropdownOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
          </div>
          <p className="w-3/5 text-xs text-start text-slate-400 font-normal">
            {value !== "" && value ? warnMessage : " "}
          </p>
        </div>
      </button>

      {isDropdownOpen && (
        <div
          className="dropdown absolute w-3/12 font-semibold max-h-60 overflow-y-auto scroll-smooth flex flex-col shadow-lg shadow-slate-300 bg-white rounded-sm"
          ref={dropDownRef}
          onClick={() => setDropdownOpen(false)}
        >
          {options.map((option, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setter(option);
                  setDropdownOpen(false);
                }}
                className="prime-category hover:bg-input px-4 py-2 w-full text-start font-normal hover:text-pallete_zero text-slate-600"
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
