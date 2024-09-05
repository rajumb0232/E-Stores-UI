import React, { useEffect, useState } from "react";
import { Input, RadioBtn } from "../../Util/Forms";
import { useStarter } from "../../../Context/Starter";
import SearchCard from "../../Util/SearchCard";
import useStore from "../../../Hooks/useStore";
import { IoSearchOutline } from "react-icons/io5";

const AddUpdateProduct = ({ update }) => {
  const { catagories } = useStarter();
  const { store } = useStore();
  const [viewSearchCard, setViewSearchCard] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [varyingView, setVaryingView] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    description: "",
    subCategory: "",
    productType: "",
    specifications: {},
    stockQuantity: 0,
    price: 0,
  });

  // GETTING THE LIST OF CATEGORIES UNDER MAIN CATEGORIES
  useEffect(() => {
    setProductTypes(
      catagories.flatMap((category) => {
        const result = category.categories.flatMap((subCategory) => {
          return subCategory.productTypes;
        });
        return result;
      })
    );
  }, [catagories, store]);

  // UPDATING THE CATEGORY BASED ON THE PRODUCT TYPE SELECTED
  useEffect(() => {
    if (selectedType) {
      catagories.flatMap((category) => {
        category.categories.flatMap((subCategory) => {
          if (subCategory.productTypes.includes(selectedType)) {
            setProduct({
              ...product,
              subCategory: subCategory.categoryName,
              productType: selectedType,
            });
          }
        });
      });
    }
  }, [selectedType]);

  //  HANDLING THE INPUT CHANGES
  const handleTextInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  return (
    <div className="min-h-screen text-slate-700 w-full font-two flex justify-center items-start">
      <div className="w-11/12 h-max py-2 px-4">
        <form
          action=""
          className="flex flex-col justify-center items-center h-max"
        >
          {/* HEADING */}
          <h1 className="text-3xl my-4 px-2 w-full font-semibold">
            {update
              ? "Look Around, Modify and Update your Product. "
              : "Enter Product Details: "}
          </h1>

          <div className="h-full w-full m-2 flex flex-col justify-center items-center">
            {/* TITLE */}
            <Input
              isRequired={true}
              name="title"
              type="text"
              placeholderText="Title"
              onChangePerform={handleTextInput}
              value={product.title}
            />

            {/* DESCRIPTION */}
            <textarea
              type="text"
              id="about"
              onChange={handleTextInput}
              placeholder="Description: "
              className="h-52 mb-2.5 w-full overflow-x-clip text-start placeholder:text-gray-500 text-slate-700 hover:border-gray-400 focus:border-gray-400 border border-gray-300 rounded-md p-2 text-base"
              value={product.description}
              name="description"
            />
          </div>

          <div className="w-full m-2 flex flex-col justify-center items-center">
            {/* CATEGORY SELECTION BLOCK */}
            <div className="w-full border p-2 rounded-md bg-pallete_three">
              <table className="w-full bg-white">
                <tr className=" border-y border-slate-400">
                  <td className="border-x border-slate-400 p-2 font-semibold">
                    Category{" "}
                  </td>
                  <td className="border-x border-slate-400 p-2 text-blue-400">
                    {store?.category?.toLowerCase()}
                  </td>
                </tr>
                <tr className=" border-y border-slate-400">
                  <td className="border-x border-slate-400 p-2 font-semibold">
                    Sub-Category{" "}
                  </td>
                  <td className="border-x border-slate-400 p-2 text-blue-400">
                    {product?.subCategory?.toLowerCase()}
                  </td>
                </tr>
                <tr className=" border-y border-slate-400 ">
                  <td className="border-x border-slate-400 p-2 font-semibold">
                    Type
                  </td>
                  <td className="border-x  border-slate-400 p-2 text-blue-400">
                    {selectedType}
                  </td>
                </tr>
              </table>
              <button
                className="w-max ml-auto text-center bg-pallete_zero text-white rounded-md p-2 my-2 text-base flex justify-start items-center hover:bg-white hover:text-pallete_zero border border-transparent hover:border-pallete_zero"
                onClick={() => setViewSearchCard(true)}
                type="button"
              >
                <div className="text-2xl text-inherit pr-2 ">
                  <IoSearchOutline />
                </div>
                Select Category Type
              </button>
            </div>

            {/* SEARCH CARD FOR CATEGORY SELECTION */}
            {viewSearchCard && (
              <SearchCard
                options={productTypes}
                viewOn={setViewSearchCard}
                setFor={setSelectedType}
              />
            )}

            {/* VARIENT CHOICE BUTTON */}
            <div className="w-full flex justify-start items-center p-1 mt-4">
              <RadioBtn
                value={"Create Varients? "}
                onChange={() => setVaryingView(!varyingView)}
                state={varyingView}
              />
            </div>

            {/* NOT A VARYING PRODUCT VIEW */}
            {!varyingView && (
              <NotVarying handleInput={handleTextInput} product={product} />
            )}

            {/* vARYING PRODUCT VIEW */}
            {varyingView && (
              <Varying handleInput={handleTextInput} product={product} />
            )}
            
            {/* IMAGE INPUT */}
            <div className="w-full">
              <input
                type="file"
                accept="image/*"
                multiple
                id="product_images"
                hidden={true}
                className="border "
              />
              <div className="w-full min-h-40 max-h-max p-2 flex flex-col justify-center items-center rounded-lg border-2 border-dotted border-gray-300 text-slate-400">
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("product_images").click()
                  }
                  className="w-full p-1 mb-auto text-sm font-bold text-blue-400 underline"
                >
                  UPLOAD PHOTOS
                </button>
                No Images Selected
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;

export const NotVarying = ({ handleInput, product }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full m-1 ml-0">
        <Input
          isRequired={true}
          name="stockQuantity"
          type="text"
          placeholderText="Stock Quantity"
          onChangePerform={handleInput}
          value={
            product.stockQuantity === 0 ? undefined : product.stockQuantity
          }
        />
      </div>
      <div className="w-full m-1 mr-0">
        <Input
          isRequired={true}
          name="price"
          type="text"
          placeholderText="Price"
          onChangePerform={handleInput}
          value={product.price === 0 ? undefined : product.price}
        />
      </div>
    </div>
  );
};

export const Varying = ({ handleInput, product }) => {
  return (
    <div className="border border-gray-300 hover:border-gray-400 focus-within:border-gray-400 "></div>
  );
};
