import React, { useEffect, useRef, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import Image from "../../../Components/Image";
import { Outlet, useNavigate } from "react-router-dom";
import { useSidebarVisibilityObserver } from "../../../Hooks/useSidebarVisibilityObsorver";
import logo1 from "/images/e_logo2.webp";
import { useSellerBin } from "../../../Hooks/useSellerBin";
import useStore from "../../../Hooks/useStore";

const SellerDashboard = () => {
  const { store } = useStore();
  const [navs, setNavs] = useState([]);

  useEffect(() => {
    setNavs([
      {
        name: "dashboard",
        display_name: "Dashboard",
        url: "/dashboard",
        icon: <RxDashboard />,
      },
      {
        name: "products",
        display_name: "Products",
        url: "products",
        icon: <BsBoxArrowInDown />,
      },
      {
        name: "orders",
        display_name: "Orders",
        url: "orders",
        icon: <BsBoxes />,
      },
      {
        name: "store",
        display_name: "Store",
        url: store?.storeId ? "store" : "setup-store",
        icon: <PiStorefrontDuotone />,
      },
    ])
  }, [store]);

  return (
    <div className="w-full border-2 border-transparent h-max flex justify-center items-start bg-white mt-14">
      <SideBar navs={navs} />
      <div className="min-h-screen max-h-max w-5/6 ml-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default SellerDashboard;

export const SideBar = ({ navs }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  useSidebarVisibilityObserver(sidebarRef);

  return (
    <div
      ref={sidebarRef}
      className={`w-1/6 flex flex-col justify-start items-center overflow-hidden h-full border pt-2 border-gray-200 border-l-0 font-semibold text-sm fixed z-10 left-0 bg-pallete_three`}
    >
      <div>
        <Hero />
      </div>
      <div className="my-4 w-full">
        {navs.map((option, i) => {
          return (
            <Switch
              icon={option.icon}
              displayName={option.display_name}
              onClick={() => navigate(option.url)}
              isSubSwitch={false}
              hovered={true}
              key={i}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Hero = () => {
  const { store } = useSellerBin();
  return (
    <div>
      <div className="mx-14 mt-4 rounded-full overflow-hidden border shadow-sm border-slate-600 flex justify-center items-center">
        <Image path={store?.logoLink} defaultUrl={logo1} />
      </div>
      <div className="mx-4">
        <p
          className={`text-lg text-slate-700 font-semibold py-1 text-center line-clamp-2`}
        >
          {store?.storeName ? store.storeName : "E Store"}
        </p>
      </div>
    </div>
  );
};

export const Switch = ({
  icon,
  displayName,
  onClick,
  isSubSwitch,
  hovered,
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (hovered) setTimeout(() => setShow(true), 200);
    else setShow(false);
  }, [hovered]);
  return (
    <button
      className={`text-xs w-full border-1 border-transparent rounded-full my-1 py-2 px-4 flex justify-start items-center ${
        isSubSwitch
          ? "text-white hover:bg-white hover:pallete_zero"
          : "hover:bg-pallete_one text-pallete_zero "
      } ${show && "hover:border-pallete_zero"}`}
      onClick={onClick}
    >
      <p className="text-2xl">{icon}</p>

      {show && (
        <p className={`pl-2 rounded-full text-sm font-normal w-max`}>
          {displayName}
        </p>
      )}
    </button>
  );
};
