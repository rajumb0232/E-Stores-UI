import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import PerformanceRecord from "./PerformanceRecord";
import Orders from "./Orders";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import useStore from "../../Hooks/useStore";
import useImage from "../../Hooks/useImage";
import Products from "./Products";

const SellerDashboard = () => {
  const [currentView, setCurrentView] = useState("");
  const [storeHovered, setStoreHovered] = useState(false);
  const [switchHovered, setSwitchHovered] = useState(false);
  const navigate = useNavigate();
  const axiosInstance = AxiosPrivateInstance();
  const { store, prevAddress } = useStore();
  const { imageURL, getImageURL } = useImage();

  let isChecked = false;
  const checkForStore = async () => {
    if (!isChecked) {
      isChecked = true;
      const response = await axiosInstance.get("/stores-exist", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        if (response.data === true) {
          sessionStorage.setItem("currentView", "dashboard");
        } else navigate("/setup-store");
      } else alert("Something went wrong!!");
    }
  };

  useEffect(() => {
    if (store?.storeId) {
      const view = sessionStorage.getItem("currentView");
      if (view) {
        setCurrentView(view);
      } else {
        setCurrentView("dashboard");
        sessionStorage.setItem("currentView", "dashboard");
      }
    } else checkForStore();
  }, [store]);

  useEffect(() => {
    if (store?.logoLink) {
      const get = () => {
        getImageURL(store.logoLink);
      };
      get();
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
      name: "manage_store",
      display_name: "Store",
      icon: <PiStorefrontDuotone />,
    },
  ];

  const subOptions = (options) => {
    return options.map((tab, i) => {
      return (
        <Switch
          icon={tab.icon}
          displayName={tab.display_name}
          onClick={() => {
            sessionStorage.setItem("currentView", tab.name);
            setCurrentView(tab.name);
          }}
          isSubSwitch={true}
          hovered={switchHovered}
          key={i}
        />
      );
    });
  };

  return (
    <div className="w-full border-2 border-transparent h-max flex justify-center items-start bg-white mt-14">
      {/* NAVIGATION */}
      <div
        className={`w-14 flex flex-col justify-start items-center overflow-hidden h-full border pt-2 border-gray-200 border-l-0 font-semibold text-sm fixed z-10 left-0 ${
          switchHovered
            ? "animate-expand bg-white shadow-even10"
            : "animate-contract bg-white"
        }`}
        onMouseEnter={() => setSwitchHovered(true)}
        onMouseLeave={() => setSwitchHovered(false)}
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
              hovered={switchHovered}
              key={i}
            />
          );
        })}

        {/* {storeOptions.some((o) => o.name === currentView) && (
          <div className="bg-black py-0.5 w-full">
            {subOptions(storeOptions)}
          </div>
        )} */}
      </div>

      <div className="w-full max-w-mid_screen lg:mx-2 flex justify-center items-center">
        {/* DASHBOARD ANALYSIS VIEW */}
        <div className="w-full lg:ml-4 xl:ml-2 h-full flex flex-col justify-center items-center rounded-sm ">
          {currentView === "dashboard" && (
            <div
              className={`w-10/12 px-2 py-0.5 flex items-center justify-center border-b-2 cursor-pointer hover:bg-gradient-to-r from-transparent from-0% via-stone-100 via-50% to-transparent to-100% `}
              onClick={() => navigate("/setup-store")}
              onMouseEnter={() => setStoreHovered(true)}
              onMouseLeave={() => setStoreHovered(false)}
            >
              <div
                className={`w-18 h-max m-2 transition-all duration-500 ease-in-out ${
                  storeHovered && "w-24"
                }`}
              >
                <div className="rounded-full overflow-hidden border border-slate-400 flex justify-center items-center">
                  <img src={imageURL} alt="" className="w-full" />
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
                  {prevAddress.addressLine1 +
                    ", " +
                    prevAddress.addressLine2 +
                    ", " +
                    prevAddress.areaVillage +
                    ", " +
                    prevAddress.cityDistrict +
                    ", " +
                    prevAddress.state +
                    ", India " +
                    prevAddress.pincode}
                </p>
              </div>
            </div>
          )}
          <div className="w-10/12 h-max rounded-sm flex justify-center items-center">
            {currentView === "dashboard" ? (
              <PerformanceRecord />
            ) : currentView === "products" ? (
              <Products />
            ) : currentView === "orders" ? (
              <Orders />
            ) : currentView === "manage_store" && (
              navigate("/setup-store")
            )
            //  : currentView === "manage_address" ? (
            //   <AddAddress />
            // ) : (
            //   currentView === "manage_contacts" && <ContactForm />
            // )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

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
      className={`text-xs w-full border-2 border-transparent rounded-full py-2 px-2 flex justify-start items-center ${
        isSubSwitch
          ? "text-white hover:bg-white hover:pallete_zero"
          : "hover:bg-pallete_one text-pallete_zero "
      } ${show && "hover:border-pallete_zero"}`}
      onClick={onClick}
    >
      <p className="text-2xl">{icon}</p>

      {show && (
        <p className={`pl-2 rounded-full font-semibold w-max`}>
          {displayName}
        </p>
      )}
    </button>
  );
};
