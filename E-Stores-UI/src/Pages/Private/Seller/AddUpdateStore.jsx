import React, { useState } from "react";
import AddStore, { AddStoreImage } from "./AddStore";
import { FormHeader, SubmitBtn } from "../../../Components/Forms";
import { useStarter } from "../../../Context/Starter";

const AddUpdateStore = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const [storeSubmited, setStoreSubmited] = useState(false);
  const [imageSubmited, setImageSubmited] = useState(false);
  const [addressSubmited, setAddressSubmited] = useState(false);
  const [contactSubmited, setContactSubmited] = useState(false);
  const { store } = useStarter();

  const submit = () => {
    setStoreSubmited(true);
  };

  return (
    <div className="flex justify-center items-start w-full h-max">
      <div className="w-10/12 flex flex-col justify-center items-start">
        <FormHeader text={"Store Details"} />
        <div className="w-full flex justify-center items-center">
          <AddStore
            isSubmited={storeSubmited}
            setIsSubmited={setStoreSubmited}
          />
          <AddStoreImage />
        </div>
        {/* SUBMIT BUTTON */}
        <div className="ml-auto my-8 mx-2 w-max flex justify-end">
          <SubmitBtn
            onClick={submit}
            isSubmited={isSubmited}
            name={store?.storeId ? "Update" : "Confirm"}
            btnType={"button"}
          />
        </div>
      </div>
    </div>
  );
};

export default AddUpdateStore;
