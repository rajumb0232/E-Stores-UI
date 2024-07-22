import React, { useEffect, useState } from "react";
import { PiStorefrontDuotone } from "react-icons/pi";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import { useTopCategories } from "../../Hooks/useOptions";
import { MdAdd, MdEdit } from "react-icons/md";
import { Input, DropDown, FormHeader, SubmitBtn } from "../../Util/Forms";
import { useStarter } from "../../Context/Starter";
import Image from "../../Util/Image";

const AddStore = () => {
  const [storeId, setStoreId] = useState("");
  const [storeName, setStoreName] = useState("");
  const [about, setAbout] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isPrevPresent, setPrevPresent] = useState(false);
  const [isAnyModified, setAnyModified] = useState(false);
  const { topCategories } = useTopCategories();

  const { store } = useStarter();
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [displayLogoURL, setDisplayLogoURL] = useState(null);

  const axiosInstance = AxiosPrivateInstance();
  const [imageHovered, setImageHovered] = useState(false);

  useEffect(() => {
    if (store?.storeId) {
      setStoreId(store.storeId);
      setStoreName(store.storeName);
      setAbout(store.about);
      setCategory(store.category);
      setPrevPresent(true);
    }
  }, [store]);

  // update isModified state if data modified
  useEffect(() => {
    if (isPrevPresent) {
      if (
        storeName !== store.storeName ||
        about !== store.about ||
        category !== store.category
      ) {
        setAnyModified(true);
      }
    }
  }, [storeName, about, category]);

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

  // handling the submit event by validating the data submitted
  const submit = (event) => {
    event.preventDefault();
    category === "" && !store
      ? alert("Category not selected!!")
      : storeName === ""
      ? alert("Store is not defined!!")
      : setIsSubmited(true);
  };

  // update Image URL to the cache
  const updateLogoLinkToStoreInCache = async (logoLink) => {
    const cache = await caches.open("user");
    const storeCache = await cache.match("/stores");
    if (storeCache) {
      const storedata = await storeCache.json();
      const newdata = { ...storedata, logoLink: logoLink };
      cache.put("/stores", new Response(JSON.stringify(newdata)));
    }
  };

  // uploade new LOGO
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedLogo);

    try {
      const response = await axiosInstance.post(
        `/stores/${storeId}/images`,
        formData,
        {
          headers: { "Content-Type": "image/*" },
        }
      );

      if (response.status === 200) {
        updateLogoLinkToStoreInCache(response.data.data);
        setIsSubmited(false);
        setAnyModified(false);
        alert("Upload successful");
      } else {
        setIsSubmited(false);
        alert(response?.data.message || response?.message);
        console.log(response?.data);
      }
    } catch (error) {
      setIsSubmited(false);
      alert(error?.response?.message);
      console.log(error?.response?.data);
    }
  };

  // works as a triggger point to Upload Image when ever the POST operation of store is done
  useEffect(() => {
    if (storeId && storeId !== "" && selectedLogo) {
      uploadImage();
    }
  }, [storeId]);

  // handling axios request to post the store data
  const updateStore = async (isNew) => {
    const URL = isNew ? `/stores` : `/stores/${storeId}`;

    const body = {
      storeName: storeName,
      category: category.toUpperCase(),
      about: about,
    };

    const updateCache = async (store) => {
      const cache = await caches.open("user");
      cache.put("/stores", new Response(JSON.stringify(store)));
    };

    // Requesting to add new store
    const add = async () => {
      try {
        const response = await axiosInstance.post(URL, body);
        // validating response
        if (response.status === 201) {
          updateCache(response?.data?.data);
          localStorage.setItem("store", "true");
          setStoreId(response?.data?.data?.storeId);
          setPrevPresent(true);
          if (!selectedLogo) {
            setIsSubmited(false);
            setAnyModified(true);
          }
        } else {
          setIsSubmited(false);
          alert(response?.data.message || response?.message);
          console.log(response?.data);
        }
      } catch (error) {
        setIsSubmited(false);
        alert(error?.response?.message);
        console.log(error?.response?.data);
      }
    };

    // Requesting to updating the existing store
    const update = async () => {
      try {
        const response = await axiosInstance.put(URL, body);

        // validating response
        if (response.status === 200) {
          updateCache(response?.data?.data);
          localStorage.setItem("store", "true");
          setStoreId(response?.data?.data?.storeId);
          setIsSubmited(false);
          setAnyModified(false);
        } else {
          setIsSubmited(false);
          alert(response?.data.message || response?.message);
          console.log(response?.data);
        }
      } catch (error) {
        setIsSubmited(false);
        alert(error?.response?.message);
        console.log(error?.response?.data);
      }
    };

    isNew ? add() : update();
  };

  // handling isSubmited changes
  useEffect(() => {
    if (isSubmited) {
      if (isPrevPresent) {
        storeName !== "" && about !== "" && storeId !== "" && isAnyModified
          ? updateStore(false)
          : isAnyModified && alert("Invalid Inputs, may be blank!!");
        setIsSubmited(false);
      } else updateStore(true);

      if (selectedLogo && store?.storeId && store?.storeId !== "") {
        console.log("externally uploading...");
        uploadImage();
      }
    }
  }, [isSubmited]);

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen">
      <FormHeader icon={<PiStorefrontDuotone />} text={"Store Details"} />

      <div className="w-full flex justify-center items-start">
        <div className="w-max mx-4 flex flex-col items-center">
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
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  >
                    <MdEdit />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("imageInput").click()
                    }
                  >
                    <MdAdd />
                  </button>
                )}
              </div>
            )}
            <div
              className={`w-40 ${
                displayLogoURL || store.logoLink
                  ? "h-max rounded-full border hover:border-slate-300 bg-transparent bg-opacity-0"
                  : "h-40 rounded-full bg-cyan-950 bg-opacity-5"
              } overflow-hidden mb-4 flex justify-center items-center text-slate-400 font-semibold`}
            >
              {displayLogoURL ? (
                <img src={displayLogoURL} className="h-full" />
              ) : store?.logoLink ? (
                <Image path={store.logoLink}/>
              ) : (
                "Upload Logo"
              )}
            </div>
          </div>
          <p className="text-sm text-slate-400 w-max">
            {"(Use Image with 1:1 ratio only)"}
          </p>

          {!store?.category && (
            <div className="my-6 w-fit">
              <DropDown
                valueType={"Category"}
                setter={setCategory}
                value={category}
                warnMessage={""}
                DefaultText={"Select Category"}
                options={topCategories}
              />
            </div>
          )}
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <div className="w-full flex justify-center items-center mb-1">
              <Input
                isRequired={true}
                placeholderText={"Your store name here:"}
                onChangePerform={setStoreName}
                value={storeName}
                type={"text"}
                name={"Store name"}
              />
            </div>

            <textarea
              type="text"
              id="about"
              onChange={(event) => setAbout(event.target.value)}
              placeholder="About (optional):"
              className="h-56 w-full overflow-x-clip text-start text-slate-700 bg-input hover:border-gray-300 focus:border-gray-300 border border-transparent rounded-md p-2 text-base"
              value={about}
            />
          </div>
          {/* SUBMIT BUTTON */}
          <div className="ml-auto my-8 w-max flex justify-end">
            <SubmitBtn
              submit={submit}
              isSubmited={isSubmited}
              name={isPrevPresent ? "Update" : "Confirm"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStore;
