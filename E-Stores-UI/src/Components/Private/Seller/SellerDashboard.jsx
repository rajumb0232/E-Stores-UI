import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import Image from "../../Util/Image";
import { useStarter } from "../../Context/Starter";
import { Outlet } from "react-router-dom";

const SellerDashboard = () => {
  const [currentView, setCurrentView] = useState("");
  const { store } = useStarter();

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
      <SideBar navs={navs} hero={<Hero store={store} />} />
      <Outlet />
    </div>
  );
};

export default SellerDashboard;

export const SideBar = ({ navs, hero }) => {
  return (
    <div
      className={`w-1/6 flex flex-col justify-start items-center overflow-hidden h-full border pt-2 border-gray-200 border-l-0 font-semibold text-sm fixed z-10 left-0 bg-pallete_three`}
    >
      <div>{hero}</div>
      <div className="my-4 w-full">
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
    </div>
  );
};

export const Hero = ({ store }) => {
  return (
    <div>
      <div className="mx-14 mt-4 rounded-full overflow-hidden border shadow-sm border-slate-600 flex justify-center items-center">
        <Image path={store?.logoLink} />
      </div>
      <div className="mx-4">
        <p className={`text-lg text-slate-700 font-semibold py-1 text-center line-clamp-2`}>
          {store?.storeName ? store.storeName : "Your store name"}
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
