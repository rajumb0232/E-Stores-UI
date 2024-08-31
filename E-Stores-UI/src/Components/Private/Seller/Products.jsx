import React from 'react'
import { LuPlus } from 'react-icons/lu'
import { NavigateBtn } from '../../Util/Forms'

const Products = () => {
  return (
    <div className="min-h-screen w-5/6 text-slate-700 font-two flex flex-col justify-start items-center ml-auto">
      <div className="w-5/6 h-max py-2 pt-6 px-4 flex justify-center items-end border-b">
        <h1 className="w-full text-4xl font-semibold py-1">
          Manage your Products
        </h1>
        <div className="ml-auto w-max">
            <NavigateBtn name={"List New Product"} icon={<LuPlus />} to={"/add-product"} dark={true}/>
        </div>
      </div>
    </div>
  )
}

export default Products