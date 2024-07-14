import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { useState } from "react";
import { VscListSelection } from "react-icons/vsc";
import { PiStorefront, PiUserCircle } from "react-icons/pi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { IoSearchOutline } from "react-icons/io5";
import Logout from "../Private/Common/Logout";
import { RxDashboard } from "react-icons/rx";
import { BsBoxes, BsCart3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";

const Headers = () => {
  const { auth } = useAuth();
  const { authenticated, roles, username } = auth;
  const [loginHovered, setLoginHovered] = useState(false);
  const [doLogout, setDoLogout] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="border border-gray-200 fixed z-50 top-0 font-sans w-screen flex justify-center bg-white">
      <nav className="px-2 flex flex-row items-center justify-center w-11/12 max-w-7xl">
        {/* LOGO */}
        <div className="mr-auto flex items-center justify-center">
          <Link to={"/"}>
            <img src="src\Images\e-stores.png" alt="" className="w-32" />
          </Link>
        </div>

        {/* SEARCH BAR */}
        <div className="rounded-xl h-4/6 w-5/12 text-lg flex items-center justify-center bg-gray-100 px-2 py-0.5">
          <div className="text-2xl text-slate-500">
            <IoSearchOutline />
          </div>
          <input
            type="text"
            placeholder="Search for products here.."
            className="border-0 rounded-xl bg-transparent placeholder:text-slate-500 hover:placeholder:text-slate-500 h-full px-2 py-4 w-full text-gray-700"
          />
        </div>

        {doLogout && <Logout doAppear={setDoLogout} />}

        {/* LOGIN AND ACCOUNT */}
        <div className=" text-slate-900 ml-auto text-md flex justify-center items-center">
          <div
            className="flex justify-start items-center"
            onMouseEnter={() => setLoginHovered(true)}
            onMouseLeave={() => setLoginHovered(false)}
          >
            <Link
              to={!authenticated && "/login"}
              className={`mx-2 px-4 py-2 rounded-md flex justify-start items-center ${
                loginHovered
                  ? "bg-pallete_zero text-white"
                  : "bg-transparent text-slate-700"
              }`}
            >
              {/* <img src="/src/Images/profile-icon.svg" className="mt-0.5 mr-1 hover:text-white" /> */}
              <div className="mt-0.5 mr-1 hover:text-white text-2xl">
                <PiUserCircle />
              </div>
              <div className="px-1 flex justify-center items-center">
                {authenticated ? username : "Login"}
                <div className="ml-1">
                  {loginHovered ? (
                    <MdKeyboardArrowUp />
                  ) : (
                    <MdKeyboardArrowDown />
                  )}
                </div>
              </div>
            </Link>
            {/* ON HOVER DISPLAY CARD */}
            {loginHovered && (
                <div className="shadow-lg shadow-slate-300 bg-white rounded-sm h-max absolute top-14 w-1/5 translate-x-2.5 -translate-y-1 flex flex-col justify-center transition-all duration-300">
                  <div className="flex justify-between items-center w-full border-b-2 border-slate-300 p-2">
                    <p className="text-slate-700 ">
                      {authenticated ? "Need break?" : "New customer?"}
                    </p>
                    <button
                      className="text-pallete_zero text-base border-2 border-pallete_zero bg-pallete_one rounded-xl font-semibold px-3 py-0.5 hover:bg-transparent hover:border-pallete_zero"
                      onClick={() => {
                        authenticated 
                        ? setDoLogout(true)
                        : navigate("/customer/register")
                      }}
                    >
                      {authenticated ? "Logout" : "Register"}
                    </button>
                  </div>

                  {roles.includes("CUSTOMER") && (
                    <div className="w-full">
                      <HoverOptions
                        name={"My Profile"}
                        to={"/account"}
                        icon={<PiUserCircle />}
                      />
                      <HoverOptions
                        name={"Wishlist"}
                        to={"/wishlist"}
                        icon={<AiOutlineHeart />}
                      />
                      {roles.includes("SELLER") && (
                        <div className="w-full">
                          <HoverOptions
                            name={"Cart"}
                            to={"/cart"}
                            icon={<BsCart3 />}
                          />
                        </div>
                      )}
                      <HoverOptions
                        name={"Orders"}
                        to={"/orders"}
                        icon={<BsBoxes />}
                      />
                    </div>
                  )}
                </div>
              )}
          </div>

          {/* CORE MODULE LINK */}
          <Link
            to={
              !authenticated
                ? "/seller/register"
                : roles.includes("SELLER")
                ? "/dashboard"
                : roles.includes("CUSTOMER") && "/cart"
            }
            className="mx-2 px-4 py-2 hover:bg-pallete_zero hover:text-white rounded-md flex justify-center items-center "
          >
            <div className="mt-0.5 mr-1 text-2xl">
              {!authenticated ? (
                <PiStorefront />
              ) : roles.includes("SELLER") ? (
                <RxDashboard />
              ) : (
                roles.includes("CUSTOMER") && <BsCart3 />
              )}
            </div>
            <p className="px-1">
              {!authenticated
                ? "Start Selling"
                : roles.includes("SELLER")
                ? "Dashboard"
                : roles.includes("CUSTOMER") && "Cart"}
            </p>
          </Link>

          {/* OPTIONS */}
          <div
            className="mx-2 px-4 py-2 hover:bg-pallete_zero hover:text-white rounded-md flex justify-center items-center "
          >
            <div className="text-xl mt-1">
              <VscListSelection />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headers;

export const HoverOptions = ({ icon, to, name }) => {
  return (
    <NavLink
      to={to}
      className="text-slate-700 w-full hover:bg-slate-100 text-base h-max"
    >
      <div className="px-2 flex justify-start items-center w-full py-2 hover:bg-gray-100">
        {icon}
        <p className="ml-1.5">{name}</p>
      </div>
    </NavLink>
  );
};
