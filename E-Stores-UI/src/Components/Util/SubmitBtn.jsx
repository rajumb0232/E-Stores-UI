import React from "react";
import { RiLoader4Fill } from "react-icons/ri";

const SubmitBtn = ({ submit, isSubmited, name, danger }) => {
  return (
    <button
      onClick={submit}
      disabled={isSubmited}
      className={` font-bold rounded-lg w-full min-w-32 px-4 py-2 border-2 border-transparent transition-colors duration-75 ease-in-out ${
        danger && "hover:border-danger hover:bg-opacity-95 border-slate-400 bg-slate-100 hover:bg-danger hover:text-white text-slate-700 focus-within:border-transparent"
      }  ${
        isSubmited
          ? "bg-transparent hover:bg-transparent bg-prussian_blue border-slate-400"
          : !danger && "bg-prussian_blue text-slate-100 hover:text-prussian_blue hover:border-prussian_blue hover:bg-white focus:border-prussian_blue focus:bg-prussian_blue"
      }`}
      type="button"
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
        name
      )}
    </button>
  );
};

export default SubmitBtn;
