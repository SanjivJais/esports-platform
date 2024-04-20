import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IoBulb, IoCaretDownOutline, IoClose } from "react-icons/io5";
import { FaTrophy } from "react-icons/fa";
import { TiHome } from 'react-icons/ti';
import { MdFeedback, MdOutlineHelp } from 'react-icons/md';
import { GrAnnounce } from 'react-icons/gr';

export const Sidebar = ({ sideOpen, mobSideOpen, mobToggleSidebar }) => {

  const Menus = [
    {
      title: 'Home',
      link: '/',
      icon: <TiHome />
    },
    {
      title: 'Tournaments',
      link: '/tournaments',
      icon: <FaTrophy />,
      submenu: true,
      submenuItems: [
        { title: 'PUBG Mobile', link: '/tournaments/pubg' },
        { title: 'Free Fire', link: '/tournaments/freefire' },
      ]
    },
    {
      title: 'Guides',
      link: '/temp1/',
      icon: <IoBulb />
    },
    {
      title: 'Announcements',
      link: '/announcement',
      icon: <GrAnnounce />
    },
    {
      separator: true,
      title: 'Help Center',
      link: '/temp2/',
      icon: <MdOutlineHelp />
    },
    {
      title: 'Feedback',
      link: '/temp3/',
      icon: <MdFeedback />
    },
  ]

  return (

    <>
      <div className={`w-64 lg:w-72 top-0 z-30 bg-secondary transition-all duration-300 h-screen md:text-[16px] text-[14px] ${sideOpen ? 'lg:sticky lg:left-0' : 'lg:fixed lg:-left-72'} fixed ${mobSideOpen ? 'left-0' : '-left-64'}`}>
        <div className="flex w-full items-center justify-end mt-4 lg:hidden"><IoClose className={`text-lg cursor-pointer ${mobSideOpen ? '' : 'rotate-180 duration-100'}`} onClick={mobToggleSidebar} /></div>
        <Link to={'/'}>
          <div className="flex h-[72px] px-4 items-center justify-center text-lg font-bold">
            EsportsGravity <sup className='text-xs text-primary ml-2 font-normal'>Beta</sup>
          </div>
        </Link>

        <div className="flex flex-col h-[88%] px-4 overflow-y-auto custom-scrollbar text-inactive pt-3 font-semibold">
          <div className="bg-frameBG px-4 mb-2 py-3 my-1 rounded-[5px] border-[0.8px] border-inactive border-opacity-20">
            <div className='flex items-center'>
              <img src="/icons/Coin.svg" alt="" />
              <label htmlFor="" className={`ml-2 text-offBlue hover:cursor-pointer`}>340</label>
            </div>
          </div>
          {Menus.map((menu, index) => (
            <div key={index} className='group'>
              {menu.separator && <div className="h-[1px] bg-inactive bg-opacity-20 my-2"></div>}
              <NavLink to={menu.link} className={({ isActive }) => `${isActive ? 'bg-primary text-secondary' : 'hover:bg-secondaryLight hover:text-offBlue'} flex justify-between items-center px-4 hover:cursor-pointer  
                py-3 my-1 rounded-[5px] transition-all ease-in-out duration-200 `}>
                <div className='flex items-center'>
                  <div className={'text-[20px]'}>
                    {menu.icon}
                  </div>
                  <label htmlFor="" className={`ml-2 hover:cursor-pointer`}>{menu.title}</label>
                </div>
                <IoCaretDownOutline className={`${menu.submenu ? '' : 'hidden'} group-hover:rotate-180 ml-2 transition-all duration-2 00`} />
              </NavLink>

              {
                menu.submenu && sideOpen && (
                  <div className='relative flex-col w-full rounded-[5px] px-2 py-0 group-hover:py-2 bg-frameBG group-hover:border-[0.8px] border-inactive border-opacity-20 h-0 transition-all duration-200 group-hover:h-fit group-hover:flex'>
                    {menu.submenuItems.map((submenuItem, index) => (
                      <NavLink to={submenuItem.link} key={index} className={({ isActive }) => isActive ? 'text-primary' : ''}> <div className={` px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex`}>{submenuItem.title}</div></NavLink>
                    ))}
                  </div>
                )
              }
            </div>
          ))}
          <div className="h-[0.8px] bg-inactive bg-opacity-20 my-2"></div>
          <div className='px-4 mt-2'>
            <label htmlFor="" className="text-[14px]">FOLLOW US</label>
            <div className="flex gap-2 justify-start mt-2">
              <svg className='' width="19" height="19" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.943 0H2.99175C1.34194 0 0 1.34576 0 2.99997V20.9998C0 22.6542 1.34199 24 2.99175 24H20.943C22.5931 24 23.9351 22.6542 23.9351 20.9998V3.00003C23.9351 1.34576 22.5932 0 20.943 0Z" fill="#1B80E4" />
                <path d="M20.1952 12H16.4554V9.00001C16.4554 8.17192 17.1257 8.25012 17.9512 8.25012H19.4474V4.5H16.4554C13.9766 4.5 11.9677 6.51439 11.9677 9.00001V12H8.97583V15.7501H11.9677V24H16.4554V15.7501H18.6993L20.1952 12Z" fill="#FCFCFC" />
              </svg>
              <svg className='' width="20" height="19" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.6189 0H3.25122C1.97204 0 0.935059 1.03698 0.935059 2.31616V21.6838C0.935059 22.963 1.97204 24 3.25122 24H22.6189C23.8981 24 24.9351 22.963 24.9351 21.6838V2.31616C24.9351 1.03698 23.8981 0 22.6189 0Z" fill="#ED2524" />
                <path fillRule="evenodd" clipRule="evenodd" d="M15.6657 11.8272L11.2465 14.2144V10.5388V9.421L13.2405 10.5057L15.6657 11.8272ZM20.9516 8.58737C20.9516 8.58737 20.7953 7.41271 20.3027 6.89643C19.6822 6.21436 18.986 6.20963 18.6639 6.17174C16.3761 6.00122 12.9421 6.00122 12.9421 6.00122H12.9327C12.9327 6.00122 9.49869 6.00122 7.20621 6.17174C6.88886 6.20963 6.19259 6.21436 5.56737 6.89643C5.07951 7.41271 4.91846 8.58737 4.91846 8.58737C4.91846 8.58737 4.75269 9.97043 4.75269 11.3488V11.5193V12.6466C4.75269 14.0249 4.91846 15.408 4.91846 15.408C4.91846 15.408 5.07951 16.5826 5.56737 17.0989C6.19259 17.781 7.00727 17.7573 7.37199 17.8283C8.68401 17.961 12.9374 17.9989 12.9374 17.9989C12.9374 17.9989 16.3761 17.9941 18.6639 17.8236C18.986 17.781 19.6822 17.781 20.3027 17.0989C20.7953 16.5826 20.9516 15.408 20.9516 15.408C20.9516 15.408 21.1174 14.0249 21.1174 12.6466V11.5903V11.3488C21.1174 9.97043 20.9516 8.58737 20.9516 8.58737Z" fill="#FEFEFE" />
              </svg>
              <svg width="20" height="19" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.93506 0H21.9351C23.5851 0 24.9351 1.35 24.9351 3V21C24.9351 22.65 23.5851 24 21.9351 24H3.93506C2.28506 24 0.935059 22.65 0.935059 21V3C0.935059 1.35 2.28506 0 3.93506 0Z" fill="url(#paint0_linear_78_91)" />
                <path d="M16.8351 3.75H9.03506C6.63506 3.75 4.68506 5.775 4.68506 8.175V15.825C4.68506 18.225 6.63506 20.25 9.03506 20.25H16.8351C19.2351 20.25 21.1851 18.225 21.1851 15.825V8.175C21.1851 5.775 19.2351 3.75 16.8351 3.75ZM19.6851 15.675C19.6851 17.325 18.3351 18.75 16.6851 18.75H9.18506C7.53506 18.75 6.18506 17.325 6.18506 15.675V8.25C6.18506 6.6 7.46006 5.25 9.18506 5.25H16.6851C18.3351 5.25 19.6851 6.675 19.6851 8.325V15.675Z" fill="white" />
                <path d="M12.9352 7.80003C10.6102 7.72503 8.66018 9.60003 8.58518 11.925C8.51018 14.25 10.3852 16.2 12.7102 16.275C15.0352 16.35 16.9852 14.475 17.0602 12.15V12.075C17.1352 9.67503 15.2602 7.80003 12.9352 7.80003ZM12.9352 14.7C11.4352 14.7 10.1602 13.5 10.1602 12C10.1602 10.5 11.3602 9.22503 12.8602 9.22503C14.3602 9.22503 15.6352 10.425 15.6352 11.925V12C15.6352 13.5 14.4352 14.7 12.9352 14.7Z" fill="white" />
                <path d="M17.285 8.4749C17.7821 8.4749 18.185 8.03838 18.185 7.4999C18.185 6.96142 17.7821 6.5249 17.285 6.5249C16.788 6.5249 16.385 6.96142 16.385 7.4999C16.385 8.03838 16.788 8.4749 17.285 8.4749Z" fill="white" />
                <defs>
                  <linearGradient id="paint0_linear_78_91" x1="5.28768" y1="25.2456" x2="20.5824" y2="-1.2456" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FEC053" />
                    <stop offset="0.327" stopColor="#F2203E" />
                    <stop offset="0.648" stopColor="#B729A8" />
                    <stop offset="1" stopColor="#5342D6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
