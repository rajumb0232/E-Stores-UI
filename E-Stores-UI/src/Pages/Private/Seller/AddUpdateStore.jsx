import React, { useEffect, useState } from "react";
import AddStore, { AddStoreImage } from "./AddStore";
import { FormHeader, SubmitBtn } from "../../../Components/Forms";
import { useStarter } from "../../../Context/Starter";

const AddUpdateStore = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [storeSubmitted, setStoreSubmitted] = useState(false);
  const [imageSubmitted, setImageSubmitted] = useState(false);
  const [addressSubmitted, setAddressSubmitted] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const { store } = useStarter();

  const submit = () => {
    setStoreSubmitted(true);
  };

  useEffect(() => console.log("from add Update store: ", store), [store])

  return (
    <div className="flex justify-center items-start w-full h-max">
      <div className="w-10/12 flex flex-col justify-center items-start">
        <FormHeader text={"Store Details"} />
        <div className="w-full flex justify-center items-center">
          <AddStore
            isSubmitted={storeSubmitted}
            setIsSubmitted={setStoreSubmitted}
          />
          <AddStoreImage />
        </div>
        {/* SUBMIT BUTTON */}
        <div className="ml-auto my-8 mx-2 w-max flex justify-end">
          <SubmitBtn
            onClick={submit}
            isSubmitted={isSubmitted}
            name={store?.storeId ? "Update" : "Confirm"}
            btnType={"button"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUpdateStore;
