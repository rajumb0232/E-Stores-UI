import React, { useEffect, useState } from "react";
import AddStore from "./AddStore";
import AddAddress from "../Common/AddAddress";
import ContactForm from "../Common/ContactForm";
import { PiStorefrontDuotone } from "react-icons/pi";
import { MdOutlineEditLocationAlt } from "react-icons/md";
import { RiContactsLine } from "react-icons/ri";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const SetUpStoreAndRelated = () => {
  const [view, setView] = useState("Store");
  const navigate = useNavigate();
  useEffect(() => {
    sessionStorage.removeItem("currentView");
  });

  useEffect(() => {
    const currentView = sessionStorage.getItem("esView");
    if (currentView) setView(currentView);
  }, []);

  const tabs = [
    {
      name: "Store",
      icon: <PiStorefrontDuotone />,
    },
    {
      name: "Address",
      icon: <MdOutlineEditLocationAlt />,
    },
    {
      name: "Contacts",
      icon: <RiContactsLine />,
    },
  ];

  return (
    <div className="w-screen min-h-screen h-max flex flex-col items-center justify-center">
      <form className="flex justify-start items-center w-11/12 h-max px-10 pb-6 mt-20 rounded-lg">
        {/* SELECTOR */}
        <div className="w-max h-4/6 p-2 top-24 border-r-1 fixed flex flex-col justify-start items-start font-semibold text-slate-700 text-md">
          <button className="w-full p-1 my-2 rounded-full flex justify-center items-center border-pallete_zero border-2 text-pallete_zero bg-white hover:bg-pallete_zero hover:text-white"
          type="button"
          onClick={() => navigate("/dashboard")}
          >
            <span>
              <IoMdArrowBack />
            </span>
            <span className="px-1 text-base">Back</span>
          </button>
          {tabs.map((option, i) => {
            return (
              <Tab
                tabName={option.name}
                icon={option.icon}
                activeTabName={view}
                onClick={() => {
                  setView(option.name);
                  sessionStorage.setItem("esView", option.name);
                }}
                key={i}
              />
            );
          })}
        </div>
        {/* FORM */}
        <div className="w-10/12 h-full ml-auto flex justify-end px-2">
          {view === "Store" ? (
            <AddStore />
          ) : view === "Address" ? (
            <AddAddress />
          ) : (
            view === "Contacts" && <ContactForm />
          )}
        </div>
      </form>
    </div>
  );
};

export default SetUpStoreAndRelated;

export const Tab = ({ tabName, icon, onClick, activeTabName }) => {
  return (
    <button
      className={`w-full p-1 my-2 flex justify-start items-center border-2 rounded-full px-2 ${
        tabName === activeTabName ? " bg-pallete_one border-pallete_zero border-2 text-pallete_zero" : "border-transparent hover:border-pallete_zero"
      }`}
      type="button"
      onClick={onClick}
    >
      <div className="pr-2">{icon}</div>
      <span className="text-base">{tabName}</span>
    </button>
  );
};
