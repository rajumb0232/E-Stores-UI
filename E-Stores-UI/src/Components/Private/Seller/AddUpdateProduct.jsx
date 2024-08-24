import React, { useEffect, useState } from "react";
import { Input, RadioBtn } from "../../Util/Forms";
import { useStarter } from "../../Context/Starter";
import SearchCard from "../../Util/SearchCard";
import useStore from "../../Hooks/useStore";

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
    <div className="min-h-screen mt-20 text-slate-700 w-full font-two flex flex-col justify-start items-center">
      <div className="w-11/12 h-max py-2 px-4 flex flex-col">
        <form action="" className="flex flex-col justify-center items-center">
          <h1 className="text-3xl my-4 px-4 w-full font-semibold">
            {update
              ? "Look Around, Modify and Update your Product. "
              : "Enter your Product Details here: "}
          </h1>
          <div className="w-full h-full flex justify-center items-start">
            <div className="w-full m-2 flex flex-col justify-center items-center">
              {/* IMAGE INPUT */}
              <input
                type="file"
                accept="image/*"
                multiple
                id="product_images"
                hidden={true}
                className="border "
              />
              <div className="w-full h-40 flex justify-center items-center rounded-lg rounded-b-none border-2 border-b-0 border-dotted border-gray-300 bg-gray-50 text-slate-400">
                No Images Selected
              </div>
              <button
                type="button"
                onClick={() =>
                  document.getElementById("product_images").click()
                }
                className="w-full p-1 mb-2.5 rounded-b-lg border-2 border-gray-300 border-dotted border-t-0 text-sm font-bold text-blue-400 underline bg-gray-50"
              >
                UPLOAD PHOTOS
              </button>

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
                className="h-56 mb-2.5 w-full overflow-x-clip text-start placeholder:text-gray-500 text-slate-700 hover:border-gray-400 focus:border-gray-400 border border-gray-300 rounded-md p-2 text-base"
                value={product.description}
                name="description"
              />
            </div>

            <div className="w-full m-2 flex flex-col justify-center items-center">
              <div className="w-full p-2 rounded-lg">
                <div className="w-full bg-white rounded-full">
                  <span className="font-semibold">Prime Category: </span>
                  <span className="text-blue-400">
                    {store?.category?.toLowerCase()}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full">
                  <span className="font-semibold">Category: </span>
                  <span className="text-blue-400">
                    {product?.subCategory?.toLowerCase()}
                  </span>
                </div>
                <div className="w-full bg-white rounded-full">
                  <span className="font-semibold">Type: </span>
                  <span className="text-blue-400">{selectedType}</span>
                </div>
              </div>
              <button
                className="mb-2.5 w-full overflow-x-clip text-start bg-gray-50 placeholder:text-gray-500 text-slate-700 hover:border-gray-400 focus:border-gray-400 border border-gray-300 rounded-md p-2 text-base"
                onClick={() => setViewSearchCard(true)}
                type="button"
              >
                Select Product Type
              </button>

              {viewSearchCard && (
                <SearchCard
                  options={productTypes}
                  closeView={setViewSearchCard}
                  setFor={setSelectedType}
                />
              )}
              <div className="w-full flex justify-start items-center p-2">
                <RadioBtn
                  value={"Create Varients? "}
                  onChange={() => setVaryingView(!varyingView)}
                  state={varyingView}
                />
              </div>
              {!varyingView && (
                <div className="w-full flex justify-center items-center">
                  <div className="w-full m-1 ml-0">
                    <Input
                      isRequired={true}
                      name="stockQuantity"
                      type="text"
                      placeholderText="Stock Quantity"
                      onChangePerform={handleTextInput}
                      value={
                        product.stockQuantity === 0
                          ? undefined
                          : product.stockQuantity
                      }
                    />
                  </div>
                  <div className="w-full m-1 mr-0">
                    <Input
                      isRequired={true}
                      name="price"
                      type="text"
                      placeholderText="Price"
                      onChangePerform={handleTextInput}
                      value={product.price === 0 ? undefined : product.price}
                    />
                  </div>
                </div>
              )}
              <div className="border border-gray-300 hover:border-gray-400 focus-within:border-gray-400 "></div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUpdateProduct;
