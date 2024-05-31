import React from 'react'

const Footer = () => {
  return (
    <>
    <div className='bg-slate-800'>
      <div className="text-white flex justify-center items-center md:h-16 flex-col md:flex-row h-[60px]">
      <div className="logo font-bold  text-xl py-2 hidden md:block">
      <span className='text-green-500'>&lt;</span>
      Secure
      <span className='text-green-500'>Key/&gt;</span>
      </div>
      <p className='font-bold py-1'> Your Trusted Partner in Digital Security!</p>
      </div>
    </div>
    </>
  )
}

export default Footer
