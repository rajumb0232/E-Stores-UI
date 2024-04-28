import React, { useEffect, useState } from "react";
import SubmitBtn from "../../Util/SubmitBtn";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";

const Logout = ({ doAppear }) => {
  const [isSubmited, setIsSubmited] = useState(false);
  const axiosInstance = AxiosPrivateInstance();
  const [loginRequested, setLoginRequested] = useState(false)

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
      className={`absolute w-max h-max top-18 right-20 px-6 hover:px-8 py-4 bg-white shadow-even20 shadow-gray-300 rounded-md flex flex-col justify-start items-center z-50 transition-all duration-300 animate-pop`}
    >
      <p className="text-lg text-slate-500 ">
        Are you sure you want to logout?
      </p>
      <div className="mt-4 w-full">
        <SubmitBtn
          isSubmited={isSubmited}
          name={"Logout"}
          submit={() => {
            console.log("submitted...");
            setIsSubmited(true)
          }}
        />
        <button
          className=" font-bold rounded-lg w-full min-w-32 px-4 py-2 text-white bg-slate-600 hover:bg-standard_black my-2"
          onClick={() => doAppear(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
