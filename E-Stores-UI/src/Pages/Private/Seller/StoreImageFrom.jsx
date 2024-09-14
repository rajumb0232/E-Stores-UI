import React, { useEffect, useState } from "react";
import { useSellerBin } from "../../../Hooks/useSellerBin";
import useStore from "../../../Hooks/useStore";
import { MdAdd, MdEdit } from "react-icons/md";
import Image from "../../../Components/Image";

const StoreImageFrom = ({ isSubmitted, setIsSubmitted }) => {
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [displayLogoURL, setDisplayLogoURL] = useState(null);
  const [imageHovered, setImageHovered] = useState(false);
  const { uploadStoreImage } = useStore();
  const { store } = useSellerBin();

  // updating Selected logo state once the image is selected
  const handleImageChange = (event) => {
    setSelectedLogo(event.target.files[0]);
  };

  // updating selectedLogo to render
  useEffect(() => {
    if (selectedLogo) {
      const reader = new FileReader();
      reader.onload = (e) => setDisplayLogoURL(e.target.result);
      reader.readAsDataURL(selectedLogo);
    }
  }, [selectedLogo]);

  // uploads image to the form
  const handleSubmit = async () => {
    setIsSubmitted(!(await uploadStoreImage(selectedLogo)));
  };

  // triggering form submission
  useEffect(() => {
    console.log("is image submitted? ", isSubmitted);
    if (isSubmitted)
      setTimeout(() => {
        handleSubmit();
      }, 1000);
  }, [isSubmitted]);

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

            {store?.logoLink || selectedLogo ? (
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

export default StoreImageFrom;
