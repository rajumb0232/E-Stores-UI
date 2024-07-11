import { useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

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
    <div>
      <button
        type="button"
        className=" w-max py-1 px-2 font-semibold text-slate-700"
        onClick={() => {
          isDropdownOpen? setDropdownOpen(false) : setDropdownOpen(true)
        }}
      >
        <div className="flex flex-col justify-start items-start w-fit">
          <div className="flex justify-start items-start w-max"> 
            <p>
              {value !== "" && value ? valueType + ": " + value : DefaultText}
            </p>
            <div className="ml-1">
              {(isDropdownOpen)? <MdKeyboardArrowUp/> : <MdKeyboardArrowDown/>}
            </div>
          </div>
          <p className="w-3/5 text-xs text-start text-slate-400 font-normal">
            {value !== "" && value ? warnMessage : " "}
          </p>
        </div>
      </button>

      {isDropdownOpen && (
        <div
          className="dropdown absolute w-3/12 font-semibold max-h-60 overflow-y-auto scroll-smooth flex flex-col shadow-lg shadow-slate-300 bg-slate-50 rounded-sm"
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
                className="prime-category hover:bg-prussian_blue hover:shadow-lg shadow-slate-700 px-4 py-2 w-full text-start font-normal hover:text-slate-100 text-slate-600"
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
