import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {
 const {user,setShowLogin}=useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className='flex items-center justify-between px-2 py-4'>
      <Link to='/'>
        <img src={assets.logo} alt="Logo" className='w-28 sm:w-32 lg:w-40' />
      </Link>

      <div className='flex items-center gap-4'>
        {user ? (
          <div className='flex items-center gap-2 sm:gap-3'>
            <button  onClick={()=>navigate('/buy')}className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-2 rounded-full hover:scale-105 transition-all duration-700'>
              <img src={assets.credit_star} className='w-5' alt="Credits" />
              <p className='text-xs sm:text-sm font-medium text-gray-600'>
                Credits left: 50
              </p>
            </button>

            <p className='text-gray-600 max-sm:hidden'>Hi, GreatStack</p>

            <div className='relative group'>
              <img
                src={assets.profile_icon}
                className='w-10 drop-shadow cursor-pointer'
                alt="Profile"
              />
              {/* Dropdown menu */}
              <div className='absolute hidden group-hover:block right-0 top-0 pt-12 z-10  text-black rounded z-10 '>
                <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                    <li className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                </ul>
                
                
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2 sm:gap-5'>
            <p onClick={() => navigate('/buy')} className='cursor-pointer'>
              Pricing
            </p>
            <button  onClick={()=>setShowLogin(true)}className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full'>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
