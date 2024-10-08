// eslint-disable-next-line no-unused-vars
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";
import { RiShoppingBag2Line } from "react-icons/ri";
import { HiOutlineTag } from "react-icons/hi2";
import { Input, SubmitBtn } from "../../Components/Forms";
import { useInputHandler } from "../../Hooks/useInputHandler";
import { useAuth } from "../../Hooks/useAuth";

const Register = ({ role, isLogin }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInput = useInputHandler();
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPwdValid, setPwdValid] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { handleLogin, handleRegister } = useAuth();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*#$^@]).{8,}$/;

  useEffect(() => {
    setEmailValid(emailRegex.test(formData.email));
    setPwdValid(pwdRegex.test(formData.password));
  }, [formData]);

  // basic request config
  const endPoint = isLogin
    ? "/login"
    : role === "SELLER"
    ? "/sellers/register"
    : "/customers/register";

  const handleSubmit = async () => {
    setIsSubmitted(
      isLogin
        ? setIsSubmitted(!(await handleLogin(endPoint, formData)))
        : setIsSubmitted(!(await handleRegister(endPoint, formData)))
    );
  };

  // when isSubmitted perform login or register
  useEffect(() => {
    if (isSubmitted !== false) {
      if (isEmailValid && isPwdValid) {
        handleSubmit();
      } else {
        alert("Invalid Input");
        setIsSubmitted(false);
      }
    }
  }, [isSubmitted]);

  return (
    <div className="w-screen h-screen font-two flex flex-col items-center justify-start">
      <form
        className="flex flex-row justify-center items-center w-4/6 h-4/5 mt-24 rounded-md bg-white border border-gray-400 overflow-hidden"
      >
        <div className="w-full bg-gray-100 text-slate-700 font-semibold h-full flex flex-col justify-center items-center p-5">
          {isLogin ? (
            <div className="p-2">
              <p className="text-3xl">Looks like you are not logged in! 🧐</p>
              <p className="text-base my-6">
                Login to sell/shop and get exclusive offers only for you 😃
              </p>
            </div>
          ) : (
            <div className="p-2 w-full flex flex-col justify-center items-start">
              <p className="text-3xl">
                {role === "SELLER"
                  ? "You're few step way 😃"
                  : "Looks like Your new 😇"}
              </p>
              <p className="text-base my-6">
                {role === "SELLER"
                  ? "1 2 and done! start selling immediately"
                  : "start shopping from top Brands and Categories."}
              </p>
            </div>
          )}
          <div className="mt-auto mb-5 flex justify-around text-slate-700 p-2 w-3/5 text-2xl">
            <LuShoppingCart /> <RiShoppingBag2Line /> <HiOutlineTag />
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col justify-center w-full h-full px-8">
          <h1 className="text-slate-700 font-semibold text-4xl my-8 ml-2">
            {isLogin ? "Login" : "Register"}
          </h1>

          <div className="flex flex-col justify-center items-start">
            <Input
              value={formData.email}
              action={handleInput(setFormData, formData)}
              placeholderText={"Enter your email: "}
              isRequired={true}
              type={"email"}
              name={"email"}
            />
            <p className="text-xs text-red-400  font-mono font-normal h-4 px-2 mb-2">
              {formData.email !== "" && !isEmailValid ? "Invalid Email Id" : ""}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start">
            <Input
              value={formData.password}
              action={handleInput(setFormData, formData)}
              placeholderText={"Enter your password: "}
              isRequired={true}
              type={"password"}
              name={"password"}
            />
            <p className="text-xs text-red-400  font-mono font-normal h-4 px-2">
              {formData.password !== "" && !isPwdValid
                ? "Password must contain at least 1 letter, 1 number, 1 special character"
                : ""}
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="w-full flex justify-end mt-4">
            <SubmitBtn
              onClick={() => setIsSubmitted(true)}
              isSubmitted={isSubmitted}
              name={"Submit"}
              btnType={"button"}
            />
          </div>

          {/* TOGGLE REDIRECTS TO LOGIN AND REGISTER */}
          <Link
            to={isLogin ? "/customer/register" : "/login"}
            className="text-sm font-semibold text-slate-700 w-full flex justify-center items-center mt-auto mb-4 hover:text-blue-500"
          >
            {isLogin
              ? "New to E-Stores? Create an account"
              : "Already have an account? Click here to login"}
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
