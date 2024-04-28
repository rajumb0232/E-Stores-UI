import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { BsBoxArrowInDown, BsBoxes } from "react-icons/bs";
import { PiStorefrontDuotone } from "react-icons/pi";
import PerformanceRecord from "./PerformanceRecord";
import InDisplayNavBtn from "./InDisplayNavBtn";
import AddUpdateProduct from "./AddUpdateProduct";
import Orders from "./Orders";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import useStore from "../../Hooks/useStore";
import useImage from "../../Hooks/useImage";

const SellerDashboard = () => {
  const [currentView, setCurrentView] = useState("");
  const [storeHovered, setStoreHovered] = useState(false);
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
        setCurrentView("dashboard")
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

  return (
    <div className="w-full border-2 border-transparent h-max flex justify-center items-start bg-gray-200 ">
      {/* MANAGEMENT BLOCK */}
      <div className="w-3/12 flex justify-center items-start rounded-sm">
        <div className="fixed top-19 w-sb h-fit bg-white rounded-sm flex flex-col justify-start items-center font-semibold text-lg">
          <div className="w-full flex flex-col items-center justify-center">
            <div
              className={`w-full px-2 py-0.5 flex items-center justify-center border-b-2 cursor-pointer hover:bg-stone-100 ${
                storeHovered && "w-full"
              }`}
              onClick={() => navigate("/setup-store")}
              onMouseEnter={() => setStoreHovered(true)}
              onMouseLeave={() => setStoreHovered(false)}
            >
              {/* LOGO */}
              <div
                className={`w-18 h-max m-2 transition-all duration-500 ease-in-out ${
                  storeHovered && "w-24"
                }`}
              >
                <div className="rounded-full flex justify-center items-center">
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
            {/* GROSS REVENUE */}
            <div className="rounded-sm w-full text-slate-700 text-base rounded-t-none p-2 h-fit">
              <p>Gross Revenue</p>
              <div className="h-36 text-slate-300 flex justify-center items-center">
                no data to show
              </div>
            </div>
          </div>
          {/* NAVIGATION LINKS */}
          <div className="flex flex-wrap justify-center items-center w-full text-xs p-1 border-t-2">
            {/* DASHBOARD */}
            <InDisplayNavBtn
              icon={<RxDashboard />}
              displayName={"View Dashboard"}
              // view={"dashboard"}
              onClick={() => {
                sessionStorage.setItem("currentView", "dashboard");
                setCurrentView("dashboard")
              }}
            />
            {/* ADD PRODUCT */}
            <InDisplayNavBtn
              icon={<BsBoxArrowInDown />}
              displayName={"Add Product"}
              // view={"addProduct"}
              onClick={() => {
                sessionStorage.setItem("currentView", "addProduct");
                setCurrentView("addProduct")
              }}
            />
            {/* MANAGE ORDERS */}
            <InDisplayNavBtn
              icon={<BsBoxes />}
              displayName={"Manage Orders"}
              // view={"manageOrders"}
              onClick={() => {
                sessionStorage.setItem("currentView", "manageOrders");
                setCurrentView("manageOrders")
              }}
            />
            {/* UPDATE STORE ADDRESS */}
            <InDisplayNavBtn
              icon={<PiStorefrontDuotone />}
              displayName={"Edit Store Info"}
              // view={"editStore"}
              onClick={() => navigate("/setup-store")}
            />
          </div>
        </div>
      </div>

      {/* DASHBOARD ANALYSIS VIEW */}
      <div className="w-content mr-2 h-full bg-gray-200 flex justify-center items-start rounded-sm">
        <div className="w-full h-max bg-gray-200 rounded-sm">
          {currentView === "dashboard" ? (
            <PerformanceRecord />
          ) : currentView === "addProduct" ? (
            <AddUpdateProduct />
          ) : currentView === "manageOrders" ? (
            <Orders />
          ) : (
            currentView === "editStore" && navigate("/setup-store")
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
