import React from 'react'
import NavigateBtn from '../../Util/NavigateBtn'
import { LuPlus } from 'react-icons/lu'

const Products = () => {
  return (
    <div className="min-h-screen w-full text-slate-700 font-two flex flex-col justify-start items-center">
      <div className="w-11/12 h-max py-2 px-4 flex flex-col">
        <h1 className="w-full text-4xl font-semibold py-2 px-4">
          Manage your Products
        </h1>
        <div className="flex justify-end items-center border rounded-full p-2 my-2 font-semibold border-pallete_zero ">
          <div className="text-sm px-2">
            <p>Hey there! Welcome Back.</p>
            <p>
              Here is all your need to manage your products, by the way do you
              want to list any new product?
            </p>
          </div>
          <div className="ml-auto w-32">
            <NavigateBtn name={"List New Product"} icon={<LuPlus />} to={"/add-product"}/>
          </div>
        </div>
        
        {/* <hr className='border-slate-300 mt-3' />
        <h3 className="w-full text-xl font-semibold py-2 px-4">Your Products</h3> */}
      </div>
    </div>
  )
}

export default Products