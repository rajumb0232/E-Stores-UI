import React, { useEffect } from "react";
import { Input } from "../../Util/Forms";
import { useStarter } from "../../Context/Starter";

const AddUpdateProduct = ({ update }) => {
  const { catagories } = useStarter();

  useEffect(() => console.log(catagories),[catagories]);

  return (
    <div className="min-h-screen mt-20 text-slate-700 w-full font-two flex flex-col justify-start items-center">
      <div className="w-10/12 h-max py-2 px-4 flex flex-col">
        <form
          action=""
          className="flex flex-col justify-center items-center border border-gray-300"
        >
          <h1 className="text-3xl my-4 font-semibold">
            {update ? "Update Product" : "Add Product"}
          </h1>
          <div className="w-full h-full flex justify-center items-start">
            <div className="w-full m-2 flex flex-col justify-center items-center">
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
              <textarea
                type="text"
                id="about"
                // onChange={(event) => setAbout(event.target.value)}
                placeholder="Description: "
                className="h-56 mb-2.5 w-full overflow-x-clip text-start placeholder:text-gray-500 text-slate-700 bg-input hover:border-gray-300 focus:border-gray-300 border border-transparent rounded-md p-2 text-base"
                // value={about}
              />
            </div>
            <div className="w-full m-2 flex flex-col justify-center items-center">
              {/* <DropDown valueType={"Product Type: "} value={"Shoe"}/> */}
              <button className="py-2 px-4 mb-2.5 cursor-pointer w-full text-center border-2 border-pallete_zero rounded-lg text-lg">
                <span className="w-full text-center">Select Product Type</span>
              </button>
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
              <Input
                isRequired={true}
                name={"title"}
                type={"text"}
                placeholderText={"Title"}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
