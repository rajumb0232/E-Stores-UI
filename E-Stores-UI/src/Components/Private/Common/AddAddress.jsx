import React, { useEffect, useState } from "react";
import SubmitBtn from "../../Util/SubmitBtn";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import { DropDown } from "../../Util/DropDown";
import Input from "../../Util/Input";
import FormHeading from "../../Util/FormHeading";
import { RiUserLocationLine } from "react-icons/ri";
import { useCityDistricts, useStates } from "../../Hooks/useOptions";
import useStore from "../../Hooks/useStore";

const AddAddress = () => {
  const [addressId, setAddressId] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [areaVillage, setAreaVillage] = useState("");
  const [cityDistrict, setCityDistrict] = useState("");
  const [pincode, setPinCode] = useState("");
  const [state, setState] = useState("");

  const [isSubmited, setIsSubmited] = useState(false);
  const axiosInstance = AxiosPrivateInstance();

  const { districts, updateDistricts } = useCityDistricts();
  const { states } = useStates();
  const { store, prevAddress } = useStore();

  // Fetching the District information and updating the cityDistrict
  let fired2 = false;
  useEffect(() => {
    if (state && state !== "" && !fired2) {
      fired2 = true;
      updateDistricts(state);
    }
  }, [state]);

  useEffect(() => {
    !districts.includes(cityDistrict) && setCityDistrict("");
  }, [districts]);

  // mapping data from address to the respective states.
  useEffect(() => {
    if (prevAddress) {
      setAddressId(prevAddress.addressId);
      setAddressLine1(prevAddress.addressLine1);
      setAddressLine2(prevAddress.addressLine2);
      setAreaVillage(prevAddress.areaVillage);
      setCityDistrict(prevAddress.cityDistrict);
      setState(prevAddress.state);
      setPinCode(prevAddress.pincode);
    }
  }, [prevAddress]);

  // Executes POST or PUT request ot the Address Data.
  const updateAddress = async (isNew) => {
    const URL = isNew
      ? `/stores/${store.storeId}/addresses`
      : `/addresses/${addressId}`;
    const body = {
      addressLine1,
      addressLine2,
      areaVillage,
      cityDistrict,
      state,
      pincode,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // update address to cache
    const updateCache = async (addressdata) => {
      const cache = await caches.open("user");
      const response = await cache.match("/stores");
      let storedata = await response.json();
      let exAddressdata = {
        ...addressdata,
        contacts: storedata.address?.contacts,
      };
      storedata = { ...storedata, address: exAddressdata };
      cache.put("/stores", new Response(JSON.stringify(storedata)));
    };

    const add = async () => {
      try {
        const response = await axiosInstance.post(URL, body, config);
        if (response.status === 201) {
          console.log(response?.data?.message);
          updateCache(response?.data?.data);
          setIsSubmited(false);
        } else {
          setIsSubmited(false);
          console.log(response);
        }
      } catch (error) {
        setIsSubmited(false);
        alert(error?.response?.message);
        console.log(error);
      }
    };

    const update = async () => {
      try {
        const response = await axiosInstance.put(URL, body, config);
        if (response.status === 200) {
          console.log(response?.data?.message);
          updateCache(response?.data?.data);
          setIsSubmited(false);
          alert(response?.data?.message)
        } else {
          setIsSubmited(false);
          console.log(response);
        }
      } catch (error) {
        setIsSubmited(false);
        alert(error?.response?.message);
        console.log(error);
      }
    };

    isNew ? add() : update();
  };

  // Validating the submit and invoking handler function
  useEffect(() => {
    if (isSubmited) {
      if (store.storeId) {
        if (prevAddress) {
          if (JSON.stringify(prevAddress) === "{}") {
            console.log("adding new address...");
            updateAddress(true); // adds new address
          } else {
            if (
              prevAddress.addressLine1 !== addressLine1 ||
              prevAddress.addressLine2 !== addressLine2 ||
              prevAddress.areaVillage !== areaVillage ||
              prevAddress.cityDistrict !== cityDistrict ||
              prevAddress.state !== state ||
              prevAddress.pincode !== pincode
            ) {
              console.log("updating the address...");
              updateAddress(false); // update existing address
            }
          }
        } else setIsSubmited(false);
      }
    } else {
      setIsSubmited(false);
    }
  }, [isSubmited]);

  return (
    <div className="flex flex-col justify-start items-center w-full h-screen">
      <div
        className={`w-full h-max flex flex-col justify-end items-center text-slate `}
      >
        <FormHeading icon={<RiUserLocationLine />} text={"Address Details"} />
        <div className="w-full px-4 py-2 h-full">
          <div className="w-full flex justify-center items-center mb-4">
            <Input
              isRequired={true}
              onChangePerform={setAddressLine1}
              placeholderText={"Address Line 1: "}
              value={addressLine1}
            />
          </div>

          <div className="w-full flex justify-center items-center mb-4">
            <Input
              isRequired={true}
              onChangePerform={setAddressLine2}
              placeholderText={"Address Line 2 (optional): "}
              value={addressLine2}
            />
          </div>

          <div className="flex justify-center items-center w-full">
            <div className="w-full flex justify-center items-center mb-4">
              <Input
                isRequired={true}
                onChangePerform={setAreaVillage}
                value={areaVillage}
                placeholderText={"Area/Village: "}
              />
            </div>
            
            <div className="w-full mb-4 flex justify-start items-center">
              <div
                className={`py-1 mx-1 min-w-max rounded-md bg-my_yellow`}
              >
                <DropDown
                  valueType={"State"}
                  value={state}
                  setter={setState}
                  DefaultText={"Select State"}
                  options={states}
                />
              </div>
              <div
                className={`py-1 mx-1 min-w-max rounded-md bg-my_yellow`}
              >
                <DropDown
                  valueType={"District"}
                  value={cityDistrict}
                  setter={setCityDistrict}
                  DefaultText={"Select District"}
                  options={districts}
                />
              </div>
            </div>
          </div>
          <div className="w-1/6">
            <Input
              isRequired={true}
              onChangePerform={setPinCode}
              placeholderText={"pincode: "}
              value={pincode}
            />
          </div>
        </div>
      </div>
      <div className={`w-max h-max ml-auto py-6 flex justify-end`}>
        <SubmitBtn
          isSubmited={isSubmited}
          name={prevAddress?.addressId? "Update" : "Confirm"}
          submit={() => setIsSubmited(true)}
        />
      </div>
    </div>
  );
};

export default AddAddress;
