import React from "react";
import { useNavigate } from "react-router-dom";

const NavigateBtn = ({ name, icon, to, dark }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`w-max p-1 px-4 my-2 rounded-full flex justify-center items-center border-pallete_zero border-2 ${
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

export default NavigateBtn;
