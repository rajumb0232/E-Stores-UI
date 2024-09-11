import React, { useEffect, useState } from "react";
import { useStarter } from "../../../Hooks/useStarter";
import { DropDown, Input } from "../../../Components/Forms";
import Image from "../../../Components/Image";
import { MdAdd, MdEdit } from "react-icons/md";
import { useInputHandler } from "../../../Hooks/useInputHandler";
import useStore from "../../../Hooks/useStore";

const AddStore = ({ isSubmitted, setIsSubmitted }) => {
  const { store, catagories } = useStarter();
  const { addStore, updateStore } = useStore();
  const [storeInForm, updateStoreInForm] = useState({
    storeName: "",
    about: "",
    category: "",
  });
  const handleInput = useInputHandler();


  useEffect(() => {
    if(store?.storeId && store?.storeId !== ""){
      // ensures smooth rendering in the UI
      setTimeout(() => {
        updateStoreInForm({
          storeName: store?.storeName,
          about: store?.about,
          category: store?.category,
        })
      },[300])
    }
  }, [store])

  // update the StoreInForm Category attribute to Upper Case, as it is an Enum.
  const refreshStoreInForm = () => {
    updateStoreInForm({
      ...storeInForm,
      category: storeInForm.category.toUpperCase(),
    });
  };

  const handleSubmit = async () => {
    // updating the storeInForm Data 
    refreshStoreInForm();
    // Submits and set the submitted status accordingly
    if (!store?.storeId || store?.storeId === "")
      setIsSubmitted(!(await addStore(storeInForm)));
    else setIsSubmitted(!(await updateStore(storeInForm)));
  };

  useEffect(() => {
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
      }
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

export default AddStore;

// -------------------------- Component to Update Store Image ----------------------------------

export const AddStoreImage = () => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [displayLogoURL, setDisplayLogoURL] = useState(null);
  const [imageHovered, setImageHovered] = useState(false);
  const { uploadStoreImage } = useStore();
  const { store } = useStarter();

  useEffect(() => {
    if (
      store?.storeId &&
      store?.storeId !== "" &&
      selectedLogo &&
      displayLogoURL
    )
      uploadStoreImage(selectedLogo);
  }, [store]);

  // updating Selected logo state once the image is selected
  const handleImageChange = (event) => {
    setSelectedLogo(event.target.files[0]);
  };

  useEffect(() => {
    if (selectedLogo) {
      const reader = new FileReader();
      reader.onload = (e) => setDisplayLogoURL(e.target.result);
      reader.readAsDataURL(selectedLogo);
    }
  }, [selectedLogo]);

  return (
    <div className="w-max flex flex-col items-center justify-center m-6">
      <div
        className="relative"
        onMouseEnter={() => setImageHovered(true)}
        onMouseLeave={() => setImageHovered(false)}
      >
        {imageHovered && (
          <div
            className="absolute right-4 bg-slate-100 p-1 border-1 border-slate-200 text-slate-400 hover:border-transparent hover:text-xl hover:text-white hover:p-1.5 hover:bg-pallete_one rounded-full flex justify-center items-center transition-all duration-150 cursor-pointer"
            title={store?.logoLink ? "Upload New Logo" : "Upload Logo"}
          >
            <input
              type="file"
              id="imageInput"
              onChange={handleImageChange}
              className="hidden"
            />

            {store?.logoLink ? (
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
              >
                <MdEdit />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => document.getElementById("imageInput").click()}
              >
                <MdAdd />
              </button>
            )}
          </div>
        )}
        <div
          className={`w-40 ${
            displayLogoURL || store?.logoLink
              ? "h-max rounded-full border hover:border-slate-300 bg-transparent bg-opacity-0"
              : "h-40 rounded-full bg-cyan-950 bg-opacity-5"
          } overflow-hidden flex justify-center items-center text-slate-400 font-semibold`}
        >
          {displayLogoURL ? (
            <img src={displayLogoURL} className="h-full" />
          ) : store?.logoLink ? (
            <Image path={store.logoLink} />
          ) : (
            "Upload Logo"
          )}
        </div>
      </div>
      <p className="text-sm text-slate-400 w-max mb-4">
        {"(Use Image with 1:1 ratio only)"}
      </p>
    </div>
  );
};
