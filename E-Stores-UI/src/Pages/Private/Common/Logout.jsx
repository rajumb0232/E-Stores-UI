import React, { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { SubmitBtn } from "../../../Components/Forms";
import { useAuth } from "../../../Hooks/useAuth";
import { useSellerBin } from "../../../Hooks/useSellerBin";

const Logout = ({ doAppear }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleLogout } = useAuth();
  const { cleanSellerData } = useSellerBin();

  const handleSubmit = async () => {
    const result = await handleLogout();
    if (result) {
      doAppear(false);
      cleanSellerData();
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      handleSubmit();
    }
  }, [isSubmitted]);

  return (
    <div
      className={`absolute w-max h-max top-18 right-20 px-6 hover:px-7 py-4 bg-white shadow-even20 shadow-gray-300 rounded-md flex flex-col justify-start items-center z-50 transition-all duration-300 animate-pop`}
    >
      <div className="text-5xl bg-transparent w-full flex justify-center items-center text-pallete_four mb-3">
        <IoWarningOutline />
      </div>
      <p className="text-lg text-slate-500 px-5">
        Are you sure you want to logout?
      </p>
      <div className="mt-4 w-full flex justify-center items-center">
        <SubmitBtn
          isSubmitted={isSubmitted}
          name={"Logout"}
          danger={true}
          onClick={() => {
            setIsSubmitted(true);
          }}
          btnType={"button"}
        />
        <button
          className=" font-bold rounded-full w-full min-w-32 px-4 py-2 border bg-pallete_zero text-white hover:text-pallete_zero border-pallete_zero hover:bg-white focus:bg-pallete_zero focus:text-white my-2 ml-1 transition-colors duration-75 ease-in-out "
          onClick={() => doAppear(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
