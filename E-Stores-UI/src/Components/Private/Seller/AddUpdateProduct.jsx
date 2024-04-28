import React from 'react'

const AddUpdateProduct = () => {
  return (
    <div className='mt-18 bg-stone-50 text-slate-700 w-full' >
      <p className='text-3xl text-slate-700 font-semibold py-2 px-4'>Add Product</p>
      <div className='w-full h-max py-2 px-4 flex flex-col'>
        <input type="text" placeholder='enter details here:' />
        <input type="text" placeholder='enter details here:' />
      </div>
    </div>
  )
}

export default AddUpdateProduct;