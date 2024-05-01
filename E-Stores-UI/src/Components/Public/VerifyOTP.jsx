import React from "react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { LuShoppingCart } from "react-icons/lu";
import { RiShoppingBag2Line } from "react-icons/ri";
import { HiOutlineTag } from "react-icons/hi2";
import SubmitBtn from "../Util/SubmitBtn";

const VerifyOTP = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [isSubmited, setIsSubmited] = useState(false);
  const inputs = Array.from({ length: 6 }, () => useRef(null));
  const [otp, setOtp] = useState(0);
  const [hiddenEmail, setHiddenEmail] = useState("");
  const [incorrectOTP, setIncorrectOTP] = useState("");
  const axiosInstance = AxiosPrivateInstance();

  useEffect(() => {
    // validating if the email is present in local storage
    const userEmail = sessionStorage.getItem("email");
    !userEmail && userEmail === "" ? navigate("/") : setEmail(userEmail);
    setHiddenEmail(
      auth.username.substring(auth.username.lastIndexOf("@gmail.com") - 4)
    );
  }, []);

  const verifyOTP = async () => {
    if (otp !== 0) {
      // requesting to verify OTP
      try {
        const response = await axiosInstance.post("/verify-email", {
          email: email,
          otp: otp,
        });
        if (response.status === 417 || response.status === 400) {
          console.log(response.data);
          setIncorrectOTP(response.data.rootCause);
        }
        if (response.status === 200) {
          console.log(response.data);
          setIncorrectOTP("");
          sessionStorage.removeItem("userId");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    verifyOTP();
  }, [otp]);

  const handleChange = (index, event) => {
    if (event.target.value && index < 5) inputs[index + 1].current.focus();
  };

  const handleKeyDown = (index, event) => {
    // Allow only numeric characters and control keys like Backspace, Delete, Arrow keys, etc.
    if (
      !/^\d$/.test(event.key) &&
      !["Backspace", "Delete", "ArrowLeft", "ArrowRight"].includes(event.key)
    )
      event.preventDefault();
    if (event.key === "Backspace" && index > 0 && !event.target.value)
      inputs[index - 1].current.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // generating OTP from all the input fields
    let inputOtp = "";
    inputs.map((input) => {
      inputOtp += input.current.value.toString();
    });
    setIsSubmited(true);
    setOtp(parseInt(inputOtp));
  };

  return (
    <div className="w-svw h-svh flex flex-row justify-center items-start bg-slate-100">
      <div className="w-4/6 h-4/6 mt-24 bg-white flex flex-row justify-center items-center shadow-sm">
        <div className="w-4/12 bg-slate-600 h-full rounded-l-md flex flex-col justify-center items-center">
          <div className="p-2 text-white mt-4">
            <p className="text-4xl font-semibold">Verify Your Email!</p>
            <p className="text-lg my-6 font-extralight text-white">
              Please Check your mail ID *****{hiddenEmail} for the OPT.
            </p>
          </div>
          <div className="mt-auto mb-5 flex justify-around text-white p-2 w-3/5 text-2xl">
            <LuShoppingCart /> <RiShoppingBag2Line /> <HiOutlineTag />
          </div>
        </div>
        <div className="h-full w-8/12 flex flex-col justify-center items-center mr-auto">
          <div className="h-full w-full flex flex-col justify-start items-center my-20">
            <p className="text-lg text-slate-500 py-2">
              Please enter your OTP here
            </p>

            <div className="h-max w-full flex justify-center items-center">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  ref={inputs[i]}
                  onChange={(e) => handleChange(i, e)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  className="bg-cyan-950 bg-opacity-5 focus:border-slate-300 hover:border-slate-300 border-2 border-slate-200  rounded-md m-2 w-12 h-12 text-center text-2xl font-semibold text-slate-700"
                />
              ))}
            </div>
            <p className="text-xs text-red-400 font-mono font-semibold min-h-3 mb-4">
              {incorrectOTP}
            </p>

            <div className="w-full flex justify-center items-center">
              <div className="w-max">
                <SubmitBtn
                  submit={handleSubmit}
                  isSubmited={isSubmited}
                  name={"Confirm"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
