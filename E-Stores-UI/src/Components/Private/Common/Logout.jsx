import React, { useEffect, useState } from "react";
import SubmitBtn from "../../Util/SubmitBtn";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import { IoWarningOutline } from "react-icons/io5";

const Logout = ({ doAppear }) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const axiosInstance = AxiosPrivateInstance();
  const [loginRequested, setLoginRequested] = useState(false);

  const handleLogout = async () => {
    const response = await axiosInstance.post("/logout");
    try {
      if (response.status === 200) {
        localStorage.clear();
        window.location.reload();
      } else {
        console.log(response?.data);
        setIsSubmited(false);
        alert(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
      setIsSubmited(false);
      alert(error?.response?.message);
    }
  };

  useEffect(() => {
    if (!loginRequested && isSubmited) {
      setLoginRequested(true);
      handleLogout();
    }
  }, [isSubmited]);
  return (
    <div
      className={`absolute w-max h-max top-18 right-20 px-6 hover:px-7 py-4 bg-white shadow-even20 shadow-gray-300 rounded-md flex flex-col justify-start items-center z-50 transition-all duration-300 animate-pop`}
    >
      <div className="text-5xl bg-transparent w-full flex justify-center items-center text-danger mb-3">
        <IoWarningOutline />
      </div>
      <p className="text-lg text-slate-500 px-5">
        Are you sure you want to logout?
      </p>
      <div className="mt-4 w-full">
        <SubmitBtn
          isSubmited={isSubmited}
          name={"Logout"}
          danger={true}
          submit={() => {
            console.log("submitted...");
            setIsSubmited(true);
          }}
        />
        <button
          className=" font-bold rounded-lg w-full min-w-32 px-4 py-2 border-2 bg-prussian_blue text-slate-100 hover:text-prussian_blue border-prussian_blue hover:bg-white focus:bg-prussian_blue my-2"
          onClick={() => doAppear(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
