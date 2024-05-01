import React from "react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import AxiosPrivateInstance from "../API/AxiosPrivateInstance";
import SubmitBtn from "../Util/SubmitBtn";
import { LuShoppingCart } from "react-icons/lu";
import { RiShoppingBag2Line } from "react-icons/ri";
import { HiOutlineTag } from "react-icons/hi2";
import Input from "../Util/Input";

const Register = ({ role, isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmitFailed, setSubmitFailed] = useState(false);
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();
  const axiosInstance = AxiosPrivateInstance();

  const emailRegex = /[a-zA-Z0-9+_.-]+@[g][m][a][i][l]+.[c][o][m]/;
  const pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[*#$^@]).{8,}$/;

  const isEmailValid = (email) => emailRegex.test(email);
  const isPwdValid = (pwd) => pwdRegex.test(pwd);

  // when isSubmitFailed changed from false to true
  useEffect(() => {
    if (isSubmitFailed !== false) {
      setIsSubmited(false);
    }
  }, [isSubmitFailed]);

  // basic request config
  const endPoint = isLogin ? "/login" : "/users/register";

  // method to handle login reguest
  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post(endPoint, { email, password });
      if (response.status === 200) {
        const accessExpiration = response.data.data.accessExpiration;
        const refreshExpiration = response.data.data.refreshExpiration;
        const user = {
          ...response.data.data,
          accessExpiration:new Date(new Date().getTime() + accessExpiration * 1000),
          refreshExpiration: new Date(new Date().getTime() + refreshExpiration * 1000)
        }

        setAuth(user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/")
      } else {
        setIsSubmited(false);
        setSubmitFailed(true);
        alert(error.response.data.message + ": " + error.response.data.rootCause)
      }
    } catch (error) {
      setIsSubmited(false);
      setSubmitFailed(true);
      alert(error.response.data.message + ": " + error.response.data.rootCause)
    }
  };

  // method to handle register request
  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post(endPoint, {
        email,
        password,
        userRole: role,
      });
      if (response.status === 202) {
        setAuth({
          ...auth,
          userId: response.data.data.userId,
          username: email
        });
        sessionStorage.setItem("email", response.data.data.email);
        navigate("/verify-email");
      } else {
        setIsSubmited(false);
        setSubmitFailed(true);
        alert(error.response.data.message + ": " + error.response.data.rootCause)
      }
    } catch (error) {
      setIsSubmited(false);
      setSubmitFailed(true);
      alert(error.response.data.message + ": " + error.response.data.rootCause)
    }
  };

  // when isSubmited get changed perform login or register
  useEffect(() => {
    if (isSubmited !== false) {
      isLogin ? handleLogin() : handleRegister();
    }
  }, [isSubmited]);

  //handling submit
  const submit = () => {
    setSubmitFailed(false);
    setIsSubmited(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-start bg-gray-100">
      <form className="flex flex-row justify-center items-center w-4/6 h-4/6 mt-24 rounded-md bg-white shadow-md">
        <div className="w-4/12 bg-slate-600 h-full rounded-l-md flex flex-col justify-center items-center p-5">
          {isLogin ? (
            <div className="p-2 text-white">
              <p className="text-4xl font-thin">
                Looks like you are not logged in!
              </p>
              <p className="text-lg my-6 font-extralight text-white">
                Login to continue using our services...
              </p>
            </div>
          ) : (
            <div className="p-2 text-white">
              <p className="text-4xl font-thin">Looks like Your new!</p>
              <p className="text-lg my-6 font-extralight text-white">
                {role === "SELLER"
                  ? "Register to access dashboard, list products and manage orders."
                  : "Register to shop, order and access cart."}
              </p>
            </div>
          )}
          <div className="mt-auto mb-5 flex justify-around text-white p-2 w-3/5 text-2xl">
            <LuShoppingCart /> <RiShoppingBag2Line /> <HiOutlineTag />
          </div>
        </div>

        {/* FORM */}
        <div className="flex flex-col justify-center w-8/12 h-full px-8">
          <h1 className="text-slate-700 font-semibold text-4xl my-8 ml-2">
            {isLogin ? "Login" : "Register"}
          </h1>

          <div className="flex flex-col justify-center items-start">
            <Input
              value={email}
              onChangePerform={setEmail}
              placeholderText={"Enter Email:"}
              isRequired={isSubmited}
            />
            <p className="text-xs text-red-400  font-mono font-semibold h-4 mb-4 px-4">
              {email !== "" && !isEmailValid(email) ? "Invalid Email Id" : ""}
            </p>
          </div>

          <div className="flex flex-col justify-center items-start">
            <Input
              value={password}
              onChangePerform={setPassword}
              placeholderText={"Enter Password:"}
              isRequired={isSubmited}
            />
            <p className="text-xs text-red-400  font-mono font-semibold h-4 mb-4 px-4">
              {password !== "" && !isPwdValid(password)
                ? "Password must contain at least 1 letter, 1 number, 1 special character"
                : ""}
            </p>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="w-full flex justify-end">
            <div className="w-max">
              <SubmitBtn
                submit={submit}
                isSubmited={isSubmited}
                name={"Submit"}
              />
            </div>
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
