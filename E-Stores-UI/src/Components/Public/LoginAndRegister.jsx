import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import { LuShoppingCart } from "react-icons/lu";
import { RiShoppingBag2Line } from "react-icons/ri";
import { HiOutlineTag } from "react-icons/hi2";
import { Input, SubmitBtn } from "../Util/Forms";

const Register = ({ role, isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmitFailed, setSubmitFailed] = useState(false);
  const [isEmailValid, setEmailValid] = useState(true);
  const [isPwdValid, setPwdValid] = useState(true);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const axiosInstance = AxiosPrivateInstance();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*#$^@]).{8,}$/;

  useEffect(() => {
    setEmailValid(emailRegex.test(email));
    setPwdValid(pwdRegex.test(password));
  }, [email, password]);

  // when isSubmitFailed changed from false to true
  useEffect(() => {
    if (isSubmitFailed === true) {
      setIsSubmited(false);
    }
  }, [isSubmitFailed]);

  // basic request config
  const endPoint = isLogin
    ? "/login"
    : role === "SELLER"
    ? "/sellers/register"
    : "customers/register";

  // method to handle login reguest
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(endPoint, { email, password });
      if (response.status === 200) {
        const accessExpiration = response.data.data.accessExpiration;
        const refreshExpiration = response.data.data.refreshExpiration;
        const user = {
          ...response.data.data,
          accessExpiration: new Date(
            new Date().getTime() + accessExpiration * 1000
          ),
          refreshExpiration: new Date(
            new Date().getTime() + refreshExpiration * 1000
          ),
        };

        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      }
    } catch (error) {
      setIsSubmited(false);
      setSubmitFailed(true);
      alert(error.response.data.message + ": " + error.response.data.rootCause);
    }
  };

  // method to handle register request
  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post(endPoint, {
        email,
        password,
      });
      if (response.status === 202) {
        setAuth({
          ...auth,
          userId: response.data.data.userId,
          username: email,
        });
        sessionStorage.setItem("email", response.data.data.email);
        navigate("/verify-email");
      } else {
        setIsSubmited(false);
        setSubmitFailed(true);
        alert(
          error.response.data.message + ": " + error.response.data.rootCause
        );
      }
    } catch (error) {
      setIsSubmited(false);
      setSubmitFailed(true);
      alert(error.response.data.message + ": " + error.response.data.rootCause);
    }
  };

  // when isSubmited perform login or register
  useEffect(() => {
    if (isSubmited !== false) {
      console.log("email", isEmailValid);
      console.log("pwd", isPwdValid);
      if (email && email !== " " && password && isEmailValid && isPwdValid) {
        isLogin ? handleLogin() : handleRegister();
      } else {
        alert("Invalid Input");
        setIsSubmited(false);
      }
    }
  }, [isSubmited]);

  //handling submit
  const submit = (e) => {
    e.preventDefault();
    setSubmitFailed(false);
    setIsSubmited(true);
  };

  return (
    <div className="w-screen h-screen font-two flex flex-col items-center justify-start">
      <form
        onSubmit={submit}
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
              value={email}
              onChangePerform={setEmail}
              placeholderText={"Enter your email: "}
              isRequired={true}
              type={"email"}
              name={"Email"}
            />
            <p className="text-xs text-red-400  font-mono font-normal h-4 px-2 mb-2">
              {email !== "" && !isEmailValid ? "Invalid Email Id" : ""}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start">
            <Input
              value={password}
              onChangePerform={setPassword}
              placeholderText={"Enter your password: "}
              isRequired={true}
              type={"password"}
              name={"Password"}
            />
            <p className="text-xs text-red-400  font-mono font-normal h-4 px-2">
              {password !== "" && !isPwdValid
                ? "Password must contain at least 1 letter, 1 number, 1 special character"
                : ""}
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="w-full flex justify-end mt-4">
            {/* <div className="w-max"> */}
            <SubmitBtn
              submit={submit}
              isSubmited={isSubmited}
              name={"Submit"}
            />
            {/* </div> */}
          </div>

          {/* TOGGLE REDIRECTS TO LOGIN AND REGISTER */}
          <Link
            to={isLogin ? "/customer/register" : "/login"}
            className="text-sm font-semibold text-slate-700 w-full flex justify-center items-center mt-auto mb-4 hover:text-blue-500"
          >
            {isLogin
              ? "New to Flipkart? Create an account"
              : "Already have an account? Click here to login"}
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Register;
