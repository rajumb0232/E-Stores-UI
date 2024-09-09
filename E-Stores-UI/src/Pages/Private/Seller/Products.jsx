import React from 'react'
import { LuPlus } from 'react-icons/lu'
import { NavigateBtn } from '../../../Components/Forms'

const Products = () => {
  return (
    <div className="min-h-screen w-full text-slate-700 font-two flex flex-col justify-start items-center">
      <div className="w-11/12 h-max py-2 pt-6 px-4 flex justify-center items-end border-b">
        <div className="ml-auto w-max">
            <NavigateBtn name={"List New Product"} icon={<LuPlus />} to={"/dashboard/add-product"} dark={true}/>
        </div>
      </div>
    </div>
  )
}

export default Products