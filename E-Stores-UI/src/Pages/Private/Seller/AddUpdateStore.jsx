import React, { useEffect, useState } from "react";
import StoreForm from "./StoreForm";
import { FormHeader, SubmitBtn } from "../../../Components/Forms";
import { useSellerBin } from "../../../Hooks/useSellerBin";
import StoreImageFrom from "./StoreImageFrom";

const AddUpdateStore = () => {
  const [storeSubmitted, setStoreSubmitted] = useState(false);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [storeExits, setStoreExists] = useState(false);
  const { store } = useSellerBin();

  /* Updates global isSubmitted state to false when all other submission states are updated to false.*/
  useEffect(() => {
      !imageSubmitted &&
      !addressSubmitted &&
      !contactSubmitted &&
      setStoreSubmitted(false);
  }, [imageSubmitted, addressSubmitted, contactSubmitted]);

  /* Runs if store exists and if the form is submitted and when store submitted is updated to false.*/
  useEffect(() => {
    if (storeExits && storeSubmitted) {
      // setAddressSubmitted(true);
      // setContactSubmitted(true);
      setImageSubmitted(true);
    }
  }, [storeExits, storeSubmitted]);

  /* When isSubmitted and storeId is present then setsStoreExists to true 
     triggering other related submissions.*/
  // useEffect(() => {
  //   store?.storeId && setStoreExists(true);
  // }, [store]);

  const submit = () => {
    setStoreSubmitted(true);
  };

  return (
    <div className="flex justify-center items-start w-full h-max">
      <div className="w-10/12 flex flex-col justify-center items-start">
        <FormHeader text={"Store Details"} />
        <div className="w-full flex justify-center items-center">
          <StoreForm
            isSubmitted={storeSubmitted}
            setIsSubmitted={setStoreSubmitted}
            setStoreExists={setStoreExists}
          />
          <StoreImageFrom
            isSubmitted={imageSubmitted}
            setIsSubmitted={setImageSubmitted}
          />
        </div>
        {/* SUBMIT BUTTON */}
        <div className="ml-auto my-8 mx-2 w-max flex justify-end">
          <SubmitBtn
            onClick={submit}
            isSubmitted={storeSubmitted}
            name={store?.storeId ? "Update" : "Confirm"}
            btnType={"button"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUpdateStore;
