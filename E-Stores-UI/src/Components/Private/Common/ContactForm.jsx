import React, { useEffect, useState } from "react";
import AxiosPrivateInstance from "../../API/AxiosPrivateInstance";
import useStore from "../../Hooks/useStore";
import FormHeader from "../../Util/FormHeading";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import Input from "../../Util/Input";
import RadioBtn from "../../Util/RadioBtn";
import SubmitBtn from "../../Util/SubmitBtn";
import { AiOutlineDelete } from "react-icons/ai";

const ContactForm = () => {
  const [contactId1, setContactId1] = useState("");
  const [contactName1, setContactName1] = useState("");
  const [contactNumber1, setContactNumber1] = useState("");
  const [contactPrimary1, setContactPrimary1] = useState(false);
  const [contactId2, setContactId2] = useState("");
  const [contactName2, setContactName2] = useState("");
  const [contactNumber2, setContactNumber2] = useState("");
  const [contactPrimary2, setContactPrimary2] = useState(false);

  const [isSubmited, setIsSubmited] = useState(false);
  const [contact1Modified, setContact1Modified] = useState(false);
  const [contact2Modified, setContact2Modified] = useState(false);
  const [doDelete, setDoDelete] = useState("");
  const axiosInstance = AxiosPrivateInstance();

  const { prevAddress, prevContacts } = useStore();

  useEffect(() => {
    !contactPrimary1 && !contactPrimary2 && setContactPrimary1(true);
  }, []);

  useEffect(() => {
    if (prevContacts && prevContacts.length > 0) {
      prevContacts.map((contact, i) => {
        if (i === 0) {
          setContactId1(contact.contactId);
          setContactName1(contact.contactName);
          setContactNumber1(contact.contactNumber);
          setContactPrimary1(contact.primary);
        } else if (i === 1) {
          setContactId2(contact.contactId);
          setContactName2(contact.contactName);
          setContactNumber2(contact.contactNumber);
          setContactPrimary2(contact.primary);
        }
      });
    }
  }, [prevContacts]);

  // marking the contact 1 data to modified if modified
  useEffect(() => {
    if (
      contactName1 !== prevContacts[0]?.contactName ||
      contactNumber1 !== prevContacts[0]?.contactNumber ||
      contactPrimary1 !== prevContacts[0]?.primary
    )
      setContact1Modified(true);
    else setContact1Modified(false);
  }, [contactName1, contactNumber1, contactPrimary1]);

  // marking the contact 2 data to modified if modified
  useEffect(() => {
    if (
      contactName2 !== prevContacts[1]?.contactName ||
      contactNumber2 !== prevContacts[1]?.contactNumber ||
      contactPrimary2 !== prevContacts[1]?.primary
    )
      setContact2Modified(true);
    else setContact2Modified(false);
  }, [contactName2, contactNumber2, contactPrimary2]);

  // applies toggle feature to the primary status of contact
  const updateContactPrimaryStatus = () => {
    if (contactName2 === "" || contactNumber2 === "") {
      alert("Enter Contact 2 details to change primary preference");
      setContactPrimary1(true);
      setContactPrimary2(false);
    } else {
      if (contactPrimary1) {
        setContactPrimary1(false);
        setContactPrimary2(true);
      } else if (contactNumber2) {
        setContactPrimary1(true);
        setContactPrimary2(false);
      }
    }
  };

  // update contact to cache
  const updateCache = async (contacts) => {
    const cache = await caches.open("user");
    const response = await cache.match("/stores");
    const storedata = await response.json();

    // Create a new address data object with updated contacts
    const updatedAddressData = {
      ...storedata.address,
      contacts: contacts,
    };

    // Create a new store data object with updated address data
    const updatedStoreData = {
      ...storedata,
      address: updatedAddressData,
    };

    // Update the cache with the new store data
    cache.put("/stores", new Response(JSON.stringify(updatedStoreData)));
  };

  // Executes POST or PUT request ot the Contact Data
  const updateContact = async (c, isNew, id) => {
    const URL = isNew
      ? `/addresses/${prevAddress.addressId}/contacts`
      : `/contacts/${id}`;

    const body = {
      contactName: c.contactName,
      contactNumber: c.contactNumber,
      primary: c.primary,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    // to add new contact
    const add = async () => {
      try {
        const response = await axiosInstance.post(URL, body, config);
        if (response.status === 201) {
          updateCache(response?.data?.data);
          setIsSubmited(false);
          alert(response.data.message);
        } else {
          console.log(response?.data?.message);
          alert(response?.data?.message);
          setIsSubmited(false);
        }
      } catch (error) {
        console.log(error?.response?.message);
        alert(error?.response?.message);
        setIsSubmited(false);
      }
    };

    // to update the existing contact
    const update = async () => {
      try {
        const response = await axiosInstance.put(URL, body, config);
        if (response.status === 200) {
          updateCache(response?.data?.data);
          setIsSubmited(false);
          alert(response.data.message);
        } else {
          console.log(response?.data?.message);
          alert(response?.data?.message);
          setIsSubmited(false);
        }
      } catch (error) {
        console.log(error?.response?.message);
        alert(error?.response?.message);
        setIsSubmited(false);
      }
    };
    isNew ? add() : update();
  };

  // Validating the submit and invoking appropriate handler function
  useEffect(() => {
    if (isSubmited) {
      if (prevAddress?.addressId) {
        const contact1 = {
          contactName: contactName1,
          contactNumber: contactNumber1,
          primary: contactPrimary1,
        };
        const contact2 = {
          contactName: contactName2,
          contactNumber: contactNumber2,
          primary: contactPrimary2,
        };

        // adding or updating contact 1
        prevContacts[0]
          ? contactName1 !== "" &&
            contactNumber1 !== "" &&
            contact1Modified &&
            updateContact(contact1, false, contactId1)
          : contactName1 !== "" &&
            contactNumber1 !== "" &&
            updateContact(contact1, true, "");

        // adding or updating contact 2
        prevContacts[1]
          ? contactName2 !== "" &&
            contactNumber2 !== "" &&
            contact2Modified &&
            updateContact(contact2, false, contactId2)
          : contactName2 !== "" &&
            contactNumber2 !== "" &&
            updateContact(contact2, true, "");
      } else {
        setIsSubmited(false);
        alert(
          "You have not updated address yet! please update it to continue..."
        );
      }
    }
  }, [isSubmited]);

  const clearFieldsOf = (id) => {
    if (contactId1 === id) {
      setContactId1("");
      setContactName1("");
      setContactNumber1("");
      if (contactId2 !== "") {
        setContactPrimary1(false);
        setContactPrimary2(true);
      }
    }
    if (contactId2 === id) {
      setContactId2("");
      setContactName2("");
      setContactNumber2("");
      setContactPrimary2(false);
      setContactPrimary1(true);
    }
  };

  const deleteContact = async () => {
    try {
      const response = await axiosInstance.delete(`/contacts/${doDelete}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        updateCache(response?.data?.data);
        clearFieldsOf(doDelete);
        setIsSubmited(false);
        alert(response.data.message);
      } else {
        console.log(response?.data?.message);
        alert(response?.data?.message);
        setIsSubmited(false);
      }
    } catch (error) {
      console.log(error?.response?.message);
      alert(error?.response?.message);
      setIsSubmited(false);
    }
  };

  useEffect(() => {
    if (doDelete && doDelete !== "") {
      console.log("deleting ", doDelete);
      deleteContact();
      setDoDelete("");
    }
  }, [doDelete]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div
        className={`w-full h-max flex flex-col justify-start items-center text-slate`}
      >
        <FormHeader
          icon={<PiUserCirclePlusDuotone />}
          text={"Contact Details"}
        />
        <div className="w-full h-max px-1 flex">
          <div className="px-2 w-full">
            <div className="w-full h-max flex justify-start items-center py-2">
              <h1 className="px-3 font-semibold text-slate-700 text-lg py-2">
                Contact 1
              </h1>
              <div className={`ml-auto`}>
                <RadioBtn
                  value={"Primary?"}
                  onChange={updateContactPrimaryStatus}
                  state={contactPrimary1}
                />
              </div>
              <div className="flex hover:relative h-10 justify-end items-center">
                <button
                  className={`p-1.5 hover:p-2 bg-cyan-950 bg-opacity-5 h-max hover:relative text-sm hover:text-xl rounded-full hover:bg-red-700 text-gray-400 hover:text-slate-50 hover:transition-all duration-300 ${
                    contactId1 === "" && "hidden"
                  }`}
                  type="button"
                  onClick={() => setDoDelete(contactId1)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
            <div className=" w-full">
              <div className="w-full flex justify-center items-center mb-4">
                <Input
                  isRequired={true}
                  onChangePerform={setContactName1}
                  value={contactName1}
                  placeholderText={"Contact name: "}
                />
              </div>

              <div className="w-full flex justify-center items-center mb-4">
                <Input
                  isRequired={true}
                  onChangePerform={setContactNumber1}
                  value={contactNumber1}
                  placeholderText={"Contact number: "}
                />
              </div>
            </div>
          </div>
          <div className="px-2 w-full">
            <div className="w-full h-max flex justify-start items-center py-2">
              <h1 className="px-3 font-semibold text-slate-700 text-lg py-2">
                Contact 2
              </h1>
              <div className={`ml-auto`}>
                <RadioBtn
                  value={"Primary?"}
                  onChange={updateContactPrimaryStatus}
                  state={contactPrimary2}
                />
              </div>
              <div className="flex hover:relative h-10 justify-end items-center">
                <button
                  className={`p-1.5 hover:p-2 bg-cyan-950 bg-opacity-5 h-max hover:relative text-sm hover:text-xl rounded-full hover:bg-red-700 text-gray-400 hover:text-slate-50 hover:transition-all duration-300 ${
                    contactId2 === "" && "hidden"
                  }`}
                  type="button"
                  onClick={() => setDoDelete(contactId2)}
                >
                  <AiOutlineDelete />
                </button>
              </div>
            </div>
            <div className=" w-full">
              <div className="w-full flex justify-center items-center mb-4">
                <Input
                  isRequired={true}
                  onChangePerform={setContactName2}
                  value={contactName2}
                  placeholderText={"Contact name: "}
                />
              </div>
              <div className="w-full flex justify-center items-center mb-4">
                <Input
                  isRequired={true}
                  onChangePerform={setContactNumber2}
                  value={contactNumber2}
                  placeholderText={"Contact number: "}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-max h-max ml-auto py-6 flex justify-end">
          <SubmitBtn
            isSubmited={isSubmited}
            name={prevContacts.length > 0 ? "Update" : "Confirm"}
            submit={() => setIsSubmited(true)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
