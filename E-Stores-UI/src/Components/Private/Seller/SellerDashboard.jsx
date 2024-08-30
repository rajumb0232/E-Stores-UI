import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import Orders from "./Orders";
import Products from "./Products";
import Store from "./Store";
import Image from "../../Util/Image";
import { useStarter } from "../../Context/Starter";
import { Outlet } from "react-router-dom";

const SellerDashboard = () => {
  const [currentView, setCurrentView] = useState("");
  const [storeHovered, setStoreHovered] = useState(false);
  const [switchHovered, setSwitchHovered] = useState(false);
  const { store, prevAddress } = useStarter();

  useEffect(() => {
    const view = sessionStorage.getItem("currentView");
    if (view) {
      setCurrentView(view);
    } else {
      setCurrentView("dashboard");
      sessionStorage.setItem("currentView", "dashboard");
    }
  }, [store]);

  const navs = [
    {
      name: "dashboard",
      display_name: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      name: "products",
      display_name: "Products",
      icon: <BsBoxArrowInDown />,
    },
    {
      name: "orders",
      display_name: "Orders",
      icon: <BsBoxes />,
    },
    {
      name: "store",
      display_name: "Store",
      icon: <PiStorefrontDuotone />,
    },
  ];

  return (
    <div className="w-full border-2 border-transparent h-max flex justify-center items-start bg-white mt-14">
      {/* NAVIGATION */}
      <SideBar navs={navs}/>
      <Outlet/>
      
      {/* <div className="w-full max-w-mid_screen lg:mx-2 flex justify-center items-center">
        <div className="w-full lg:ml-4 xl:ml-2 h-full flex flex-col justify-center items-center rounded-sm ">
            <div
              className={`w-10/12 px-2 py-0.5 flex items-center justify-center border-b-2 cursor-pointer hover:bg-gradient-to-r from-transparent from-0% via-stone-100 via-50% to-transparent to-100% `}
              onClick={() => setCurrentView("store")}
              onMouseEnter={() => setStoreHovered(true)}
              onMouseLeave={() => setStoreHovered(false)}
            >
              <div
                className={`w-18 h-max m-2 transition-all duration-500 ease-in-out ${
                  storeHovered && "w-24"
                }`}
              >
                <div className="rounded-full overflow-hidden border border-slate-400 flex justify-center items-center">
                  <Image path={store?.logoLink} />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start hover:transition-all duration-500 delay-200 ease-in-out">
                <p
                  className={`text-lg text-slate-700 font-semibold py-1 line-clamp-1`}
                >
                  {store?.storeName ? store.storeName : "Your store name"}
                </p>
                <p
                  className={`text-xs font-normal text-slate-500 line-clamp-1`}
                >
                  {prevAddress?.pincode
                    ? prevAddress?.addressLine1 +
                      ", " +
                      prevAddress?.addressLine2 +
                      ", " +
                      prevAddress?.areaVillage +
                      ", " +
                      prevAddress?.cityDistrict +
                      ", " +
                      prevAddress?.state +
                      ", India " +
                      prevAddress?.pincode
                    : "[Address] | e.g., #32 building name, street, landmark, India 900068"}
                </p>
              </div>
            </div>
          
        </div>
      </div> */}
    </div>
  );
};

export default SellerDashboard;

export const SideBar = ({navs}) => {
  return (
    <div
      className={`w-1/6 flex flex-col justify-start items-center overflow-hidden h-full border pt-2 border-gray-200 border-l-0 font-semibold text-sm fixed z-10 left-0 bg-white`}
    >
      {navs.map((option, i) => {
        return (
          <Switch
            icon={option.icon}
            displayName={option.display_name}
            onClick={() => {
              sessionStorage.setItem("currentView", option.name);
              setCurrentView(option.name);
            }}
            isSubSwitch={false}
            hovered={true}
            key={i}
          />
        );
      })}
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
      className={`text-xs w-full border-2 border-transparent rounded-full py-2 px-4 flex justify-start items-center ${
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
