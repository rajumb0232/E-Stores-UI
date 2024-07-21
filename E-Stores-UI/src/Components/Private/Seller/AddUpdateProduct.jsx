import React from "react";
import { Input } from "../../Util/Forms";

const AddUpdateProduct = ({ update }) => {
  return (
    <div className="min-h-screen mt-20 text-slate-700 w-full font-two flex flex-col justify-start items-center">
      <div className="w-10/12 h-max py-2 px-4 flex flex-col">
        <form action="" className="flex flex-col justify-center items-center border border-gray-300">
          <h1 className="text-3xl my-4 font-semibold">
            {update ? "Update Product" : "Add Product"}
          </h1>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
          <Input isRequired={true} name={"title"} type={"text"} placeholderText={"Title"}/>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
