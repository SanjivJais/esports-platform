import React from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useAuth } from '../utils/AuthContext';

export const Navbar = ({ toggleSidebar, mobToggleSidebar }) => {
  const { user } = useAuth();
  return (
    <nav className="sticky z-50 top-0 bg-secondary h-[72px] md:px-6 shadow-md flex items-center justify-between pl-0 pr-6">
      <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 md:block hidden' onClick={toggleSidebar} />
      <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 md:hidden' onClick={mobToggleSidebar} />

      <div className="flex gap-3 items-center">
        <div className="flex bg-secondaryLight items-center rounded-[3px] border-[1px] border-secondary px-6 py-2"><input type="text" className='bg-transparent focus:outline-none w-full' placeholder='Search' /><GoSearch className='text-lg text-inactive' /></div>
        <div className="flex">
          {/* <img src="" alt="" className='h-20 w-auto' /> */}

          <label htmlFor="user">{(user != null && (user.email))}</label>
        </div>
        {(user == null && (
          <>
            <Link to={'/login'}><button className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>Login</button></Link>
            <Link to={'/signup'}><button className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-medium'>Signup</button></Link>
          </>
        ))}
      </div>
    </nav>
  )
}
