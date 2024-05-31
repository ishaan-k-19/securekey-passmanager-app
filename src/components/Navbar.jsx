import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className="flex text-white items-center justify-center md:justify-start h-16">
      <div className="logo font-bold  text-2xl">
      <span className='text-green-500'>&lt;</span>
      Secure
      <span className='text-green-500'>Key/&gt;</span>
      </div>
      </div>
    </nav>
  )
}

export default Navbar
