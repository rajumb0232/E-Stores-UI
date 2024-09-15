import React from "react";
import { LuBadgeInfo } from "react-icons/lu";
import { GrLocation } from "react-icons/gr";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { NavigateBtn } from "../../../Components/Forms";
import Image from "../../../Components/Image";
import { useSellerBin } from "../../../Hooks/useSellerBin";

const Store = () => {
  const { store, contacts, address} = useSellerBin();

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen font-two">
      <div className="my-6 w-11/12 h-full flex justify-center items-center">
        <div className="w-2/5 h-full py-6 px-4 m-2 flex flex-col justify-start items-center border rounded-lg">
          <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-300">
            <Image path={store?.logoLink} />
          </div>
          <div className="px-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl w-full text-center line-clamp-2 my-2">
              {store?.storeName ? store?.storeName : "Your Store Name"}
            </h1>
            <p className="text-base text-slate-700">
              {" (" + (store?.category ? store?.category : "CATEGORY") + ")"}
            </p>
          </div>
        </div>

        <div className="w-full h-full border rounded-lg m-2 py-4 px-4 flex flex-col justify-start items-center">
          <div className="w-full my-2 p-4 flex flex-col justify-center items-start border border-gray-400 rounded-lg">
            <div className="flex justify-center items-center">
              <LuBadgeInfo className="text-2xl" />
              <h4 className="ml-1 text-lg font-bold w-full">About</h4>
            </div>
            <p className="w-full my-1">
              {store?.about
                ? store?.about
                : ".. Write a description, let people know more about your store."}
            </p>
          </div>
          <div className="w-full my-2 p-4 flex flex-col justify-center items-start border border-gray-400 rounded-lg">
            <div className="flex justify-center items-center">
              <GrLocation className="text-2xl" />
              <h4 className="ml-1 font-bold text-lg w-full">Address</h4>
            </div>
            <p className="w-full my-2 text-base">
              {address?.pincode
                ? address?.addressLine1 +
                  ", " +
                  address?.addressLine2 +
                  ", " +
                 address?.areaVillage +
                  ", " +
                  address?.cityDistrict +
                  ", " +
                aAddress?.state +
                  ", India " +
                  aAddress?.pincode
                : "[Address] | e.g., #32 building name, street, landmark, India 900068"}
            </p>
          </div>
          <div className="h-max w-full m-2 pt-2 px-4 flex flex-col justify-start items-start">
            <div className="flex flex-col justify-start items-start text-sm">
              <GetContact contacts={contacts} isPrimary={true} />
              <GetContact contacts={contacts} isPrimary={false} />
            </div>
          </div>
          <div className="w-full flex justify-end items-center mr-2">
            <NavigateBtn
              dark={true}
              name={"Manage Store"}
              to={"/dashboard/setup-store"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

export const GetContact = ({ contacts, isPrimary }) => {
  return contacts.map((contact, i) => {
    if (contact?.primary === isPrimary) {
      return (
        <div className="flex flex-col justify-center items-start my-3" key={i}>
          <div className="flex justify-center items-center">
            <MdOutlinePhoneInTalk />
            <h4 className="font-semibold ml-1">
              {isPrimary ? "Primary Contact" : "Additional Contact"}
            </h4>
          </div>
          <span className="">{contact?.contactName}</span>
          <span className="">{contact?.contactNumber}</span>
        </div>
      );
    }
  });
};
