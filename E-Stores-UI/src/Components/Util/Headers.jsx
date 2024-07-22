import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";
import { useState } from "react";
import { VscListSelection } from "react-icons/vsc";
import { PiStorefront, PiUserCircle } from "react-icons/pi";
import {
  MdArticle,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import {
  IoDocumentTextOutline,
  IoLogoLinkedin,
  IoSearchOutline,
} from "react-icons/io5";
import Logout from "../Private/Common/Logout";
import { RxDashboard } from "react-icons/rx";
import { BsBoxes, BsCart3 } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { TbZoomCode } from "react-icons/tb";
import { SiHashnode, SiPostman } from "react-icons/si";
import { LuUserCircle } from "react-icons/lu";
import { FaGithub } from "react-icons/fa";

const Headers = () => {
  const { auth } = useAuth();
  const { authenticated, roles, username } = auth;
  const [loginHovered, setLoginHovered] = useState(false);
  const [addOnsHovered, setAddOnsHovered] = useState(false);
  const [doLogout, setDoLogout] = useState(false);

  const preAuthNavs = [
    {
      title: "Login",
      to: "/login",
      icon: <PiUserCircle />,
      cardOnHover: true,
      toggleState: setLoginHovered,
    },
    {
      title: "Become a Seller",
      to: "/seller/register",
      icon: <PiStorefront />,
      cardOnHover: false,
    },
  ];

  const postSellerAuthNavs = [
    {
      title: username,
      to: undefined,
      icon: <PiUserCircle />,
      cardOnHover: true,
      toggleState: setLoginHovered,
    },
    {
      title: "Dashboard",
      to: "/dashboard",
      icon: <RxDashboard />,
      cardOnHover: false,
    },
  ];

  const postCustomerAuthNavs = [
    postSellerAuthNavs[0],
    {
      title: "Cart",
      to: "/cart",
      icon: <BsCart3 />,
      cardOnHover: false,
    },
  ];

  let navs =
    authenticated && roles.includes("SELLER")
      ? postSellerAuthNavs
      : authenticated && roles.includes("CUSTOMER")
      ? postCustomerAuthNavs
      : preAuthNavs;

  const addOns = [
    {
      title: "API Documentation",
      url: "http://localhost:7000/swagger-ui.html",
      icon: <IoDocumentTextOutline />,
    },
    {
      title: "Source Code",
      url: "https://github.com/rajumb0232/E-Stores-Shopping-Application",
      icon: <TbZoomCode />,
    },
    {
      title: "Postman",
      url: "https://e-stores.postman.co/workspace/Team-Workspace~f285e463-d634-46c0-882f-a50b8e8e59f3/api/48bfcf95-c648-4465-92da-6b87a9480b3e?action=share&creator=36942562&active-environment=36942562-c940278d-34a3-4f8f-9b14-8a7141964326",
      icon: <SiPostman />,
    },
    {
      title: "My Portfolio",
      url: "https://github.com/rajumb0232",
      icon: <LuUserCircle />,
    },
    {
      title: "GitHub",
      url: "https://localhost:8080/rajumb0232",
      icon: <FaGithub />,
    },
    {
      title: "Linkdin",
      url: "https://www.linkedin.com/in/raju-gowda-atwork",
      icon: <IoLogoLinkedin />,
    },
    {
      title: "Blogs",
      url: "https://blogs.bitsofdevbrain.com",
      icon: <MdArticle />,
    },
    {
      title: "Hashnode",
      url: "https://hashnode.com/@RajuGowda",
      icon: <SiHashnode />,
    },
  ];

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
          {/* HOVER OPTIONS */}
          {navs.map((nav, i) => {
            return (
              <MyNav
                authenticated={authenticated}
                isHovered={loginHovered}
                nav={nav}
                roles={roles}
                setDoLogout={setDoLogout}
                key={i}
              />
            );
          })}

          {/* OPTIONS */}
          <div
            className="mx-2 px-4 py-2 hover:bg-pallete_zero hover:text-white rounded-full flex justify-center items-center "
            onMouseEnter={() => setAddOnsHovered(true)}
            onMouseLeave={() => setAddOnsHovered(false)}
          >
            <div className="text-xl mt-1">
              <VscListSelection />
              {addOnsHovered && (
                <div className="shadow-lg shadow-slate-300 bg-white rounded-sm h-max absolute top-14 w-1/5 -translate-x-3/4 -translate-y-2 flex flex-col justify-center transition-all duration-300">
                  <div className="flex flex-col justify-between items-center w-full p-2">
                    {addOns.map((item, i) => {
                      return (
                        <a
                          href={item.url}
                          target="_blank"
                          className="text-slate-700 w-full hover:bg-slate-100 text-base h-max"
                          key={i}
                        >
                          <div className="px-2 flex justify-start items-center w-full py-2 hover:bg-gray-100">
                            {item.icon}
                            <p className="ml-1.5">{item.title}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Headers;

export const MyNav = ({
  nav,
  isHovered,
  authenticated,
  roles,
  setDoLogout,
}) => {
  const { title, to, icon, cardOnHover, toggleState } = nav;

  return (
    <div
      className="mx-2 px-4 py-2 rounded-full flex justify-start items-center hover:bg-pallete_zero hover:text-white bg-transparent text-slate-700"
      onMouseEnter={() => toggleState && toggleState(true)}
      onMouseLeave={() => toggleState && toggleState(false)}
    >
      <Link to={to} className={`flex justify-start items-center`}>
        <div className="mt-0.5 mr-1 hover:text-white text-2xl">{icon}</div>
        <div className="px-1 flex justify-center items-center">
          {title}
          {cardOnHover && (
            <div className="ml-1">
              {isHovered ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </div>
          )}
        </div>
      </Link>

      {/* ON HOVER DISPLAY CARD */}
      {cardOnHover && isHovered && (
        <UsersCard
          authenticated={authenticated}
          roles={roles}
          setDoLogout={setDoLogout}
        />
      )}
    </div>
  );
};

export const UsersCard = ({ authenticated, roles, setDoLogout }) => {
  const navigate = useNavigate();

  return (
    <div className="shadow-lg shadow-slate-300 bg-white rounded-sm h-max absolute top-14 w-1/5 -translate-x-5 -translate-y-1 flex flex-col justify-center transition-all duration-300">
      <div className="flex justify-between items-center w-full border-b-2 border-slate-300 p-2">
        <p className="text-slate-700 ">
          {authenticated ? "Need break?" : "New customer?"}
        </p>
        <button
          className="text-pallete_zero text-base border-2 border-transparent bg-transparent rounded-full font-semibold px-3 py-0.5 hover:bg-pallete_one  hover:border-pallete_zero"
          onClick={() => {
            authenticated ? setDoLogout(true) : navigate("/customer/register");
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
              <HoverOptions name={"Cart"} to={"/cart"} icon={<BsCart3 />} />
            </div>
          )}
          <HoverOptions name={"Orders"} to={"/orders"} icon={<BsBoxes />} />
        </div>
      )}
    </div>
  );
};

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
