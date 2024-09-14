import React, { useEffect, useState } from "react";
import { DropDown, Input } from "../../../Components/Forms";
import { useInputHandler } from "../../../Hooks/useInputHandler";
import useStore from "../../../Hooks/useStore";
import { useSellerBin } from "../../../Hooks/useSellerBin";

const StoreForm = ({ isSubmitted, setIsSubmitted, setStoreExists }) => {
  const { store, catagories } = useSellerBin();
  const { addStore, updateStore } = useStore();
  const [storeInForm, updateStoreInForm] = useState({
    storeName: "",
    about: "",
    category: "",
  });
  const handleInput = useInputHandler();

  useEffect(() => {
    if (store?.storeId && store?.storeId !== "") {
      // ensures smooth rendering in the UI
      setTimeout(() => {
        updateStoreInForm({
          storeName: store?.storeName,
          about: store?.about,
          category: store?.category,
        });
      }, [300]);
    }
  }, [store]);

  // update the StoreInForm Category attribute to Upper Case, as it is an Enum.
  const refreshStoreInForm = () => {
    updateStoreInForm({
      ...storeInForm,
      category: storeInForm.category.toUpperCase(),
    });
  };

  const updateStates = (completed) =>
    completed && setIsSubmitted(false) && setStoreExists(true);

  const handleSubmit = async () => {
    // updating the storeInForm Data
    refreshStoreInForm();
    // Submits and set the submitted status accordingly
    if (!store?.storeId || store?.storeId === "") {
      updateStates(await addStore(storeInForm));
    } else {
      const completed = await updateStore(storeInForm);
      updateStates(await addStore(storeInForm));
    }
  };

  useEffect(() => {
    console.log("is store submitted? ", isSubmitted);
    if (isSubmitted) {
      if (storeInForm.category === "") {
        alert("Category not selected!!");
        setIsSubmitted(false);
      } else if (storeInForm.storeName === "") {
        alert("Please Enter Store Name!!");
        setIsSubmitted(false);
      } else if (
        store?.storeName !== storeInForm.storeName ||
        store?.about !== storeInForm.about ||
        store?.category !== storeInForm.category
      ) {
        handleSubmit();
      } else setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="w-full">
      <div className="w-5/6 flex flex-col items-center">
        <div className="w-full flex justify-center items-center mb-1">
          <Input
            isRequired={true}
            placeholderText={"Your store name here:"}
            action={handleInput(updateStoreInForm, storeInForm)}
            value={storeInForm?.storeName}
            type={"text"}
            name={"storeName"}
            label={"Store Name: "}
          />
        </div>

        <label
          htmlFor={"about"}
          className="block text-left w-full text-base font-medium text-slate-700 mb-1"
        >
          About:
        </label>
        <textarea
          type="text"
          id="about"
          name="about"
          onChange={handleInput(updateStoreInForm, storeInForm)}
          placeholder="About (optional):"
          className="h-56 w-full overflow-x-clip placeholder:text-slate-500 text-start  hover:border-gray-400 focus:border-gray-300 border border-gray-300 rounded-md p-2 text-base"
          value={storeInForm?.about}
        />
      </div>
      {!store?.category && (
        <div className="my-6 w-fit">
          <DropDown
            valueType={"Category "}
            setter={(option) => {
              updateStoreInForm({ ...storeInForm, category: option });
            }}
            value={storeInForm?.category}
            warnMessage={""}
            DefaultText={"Select Category"}
            options={catagories.map((cat) => cat.displayName)}
          />
        </div>
      )}
    </div>
  );
};

export default StoreForm;
