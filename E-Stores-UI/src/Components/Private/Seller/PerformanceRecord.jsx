import React from "react";
import useStore from "../../Hooks/useStore";

const PerformanceRecord = () => {
  const { store } = useStore();
  let totalOrders = "1206";
  let result = "";
  for (let i = totalOrders.length - 1, count = 0; i >= 0; i--) {
    result = totalOrders[i] + result;
    count++;
    if (count % 3 === 0 && i !== 0) result = "," + result;
  }

  return (
    <div className="mt-18 w-full flex flex-col justify-center bg-white items-start">
      {/* ORDERS */}
      <div className="h-max w-full px-4 py-2 hover:bg-white border-b-4">
        <div className="h-max w-full flex flex-col justify-center items-start">
          {/* REVENUE */}
          <p className="text-slate-700 font-semibold">Total Orders</p>
          <div className="text-6xl w-full text-slate-500 font-semibold flex justify-start items-center py-4 border-b-2">
            {/* <MdCurrencyRupee /> */}
            <p className="text-slate-400">{result}</p>
          </div>
          {/* ORDER STATUS */}
          <div className="w-full h-max py-2 flex justify-around items-center text-slate-700 font-semibold">
            <DataCartBtn name={"Completed"} data={"00"} />
            <DataCartBtn name={"Yet to dispatch"} data={"00"} />
            <DataCartBtn name={"Shipped"} data={"00"} />
            <DataCartBtn name={"Returned"} data={"00"} />
          </div>
        </div>
      </div>
      {/* PRODUCT LISTING */}
      <div className="h-max w-full px-4 py-2 hover:bg-white border-b-4">
        <p className="text-slate-700 font-semibold w-full pb-4">
          Product Listing
        </p>
        <div className="w-full h-max py-2 border-t-2 flex justify-around items-center text-slate-700 font-semibold">
          <DataCartBtn name={"Verified & Active"} data={"00"} />
          <DataCartBtn name={"NonVerfied"} data={"00"} />
          <DataCartBtn name={"InActive"} data={"00"} />
          <DataCartBtn name={"Out Of Stock"} data={"00"} />
          <DataCartBtn name={"Low Stock (<3 units)"} data={"00"} />
        </div>
      </div>
      {/* MOST SOLD */}
      <div className="h-max w-full px-4 py-2 hover:bg-white border-b-4">
        <p className="text-slate-700 font-semibold w-full pb-4">
          Your most popular products
        </p>
        <div className="w-full h-96 py-2 border-t-2 flex justify-around items-center text-slate-300 font-semibold">
          No data
        </div>
      </div>
      {/* TRENDING */}
      <div className="h-max w-full px-4 py-2 hover:bg-white border-b-4">
        <p className="text-slate-700 font-semibold w-full pb-4">
          Trending products
        </p>
        <div className="w-full h-96 py-2 border-t-2 flex justify-around items-center text-slate-300 font-semibold">
          No data
        </div>
      </div>
    </div>
  );
};

export default PerformanceRecord;


export const DataCartBtn = ({name, data}) => {
  return (
    <div className="pt-2 flex flex-col justify-center items-center w-full hover:bg-stone-100">
      <p>{name}</p>
      <p className="text-2xl py-4 text-slate-500">{data}</p>
    </div>
  );
};
