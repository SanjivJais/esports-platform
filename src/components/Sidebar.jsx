import React from 'react'
import { Link } from 'react-router-dom'
import { IoClose } from "react-icons/io5";
import { useAuth } from '../utils/AuthContext';

export const Sidebar = ({ sideOpen, mobSideOpen, mobToggleSidebar }) => {
  const { logoutUser, user } = useAuth();

  return (
    <>
      <div className={`w-64 md:w-72 top-0 px-4 z-60  bg-secondary transition-all duration-300 h-screen md:text-[16px] text-[14px] ${sideOpen ? 'md:sticky md:left-0' : 'md:fixed md:-left-72'} fixed ${mobSideOpen ? 'left-0' : '-left-64'}`}>
        <div className="flex w-full items-center justify-end mt-4 md:hidden"><IoClose className={`text-lg cursor-pointer ${mobSideOpen ? '' : 'rotate-180 duration-100'}`} onClick={mobToggleSidebar} /></div>
        <Link to={'/'}>
          <div className="flex h-[72px] px-4 items-center justify-center text-lg font-bold">
            Hamro Esports <sup className='text-xs text-primary ml-2 font-normal'>Beta</sup>
          </div>
        </Link>
        <div className="flex flex-col">
          {user != null && (
            <>
              <Link to={'/profile'}>Profile</Link>
              <label onClick={logoutUser} htmlFor="Logout" className='text-inactive underline underline-offset-4'>Logout</label>
            </>
          )}
        </div>
      </div>
    </>
  )
}
