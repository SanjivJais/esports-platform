import React, { useEffect, useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useAuth } from '../utils/AuthContext';
import { Modal } from './Modal';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { Search } from './Search';
import { IoNotificationsOutline } from 'react-icons/io5';
import { NotificationTile } from './NotificationTile';
import { Query } from 'appwrite'
import { database, db_id } from '../../config/Appwrite'



export const Navbar = ({ toggleSidebar, mobToggleSidebar }) => {


  const { user, logoutUser, userDetails } = useAuth();
  const [searchEnable, setSearchEnable] = useState(null);
  const handleSearchEnable = () => { setSearchEnable(!searchEnable); }

  const [notifications, setNotifications] = useState(null)



  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const allNotificationsResponse = await database.listDocuments(db_id, 'notifications', [
          Query.limit(25),
          Query.orderDesc('$createdAt'),
          Query.equal('recipentType', 'all')
        ]);

        let allNotifications = allNotificationsResponse.documents;

        if (userDetails && userDetails.notifications.length > 0) {
          const userNotificationsResponse = await database.listDocuments(db_id, 'notifications', [
            Query.contains('$id', userDetails.notifications),
            Query.limit(25)
          ]);

          const userNotifications = userNotificationsResponse.documents;
          const existingIds = new Set(allNotifications.map(not => not.$id));

          const newNotifications = userNotifications.filter(not => !existingIds.has(not.$id));
          allNotifications = [...allNotifications, ...newNotifications];
          allNotifications.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
        }

        setNotifications(allNotifications);
      } catch (error) {
        console.error("Error fetching notifications!");
      }
    };

    if (user) {

      fetchNotifications();
    }

  }, [userDetails]);




  const [notificationPanel, setNotificationPanel] = useState(false)

  const [unreadCount, setUnreadCount] = useState(0)
  useEffect(() => {
    if (user && notifications) {
      setUnreadCount(
        notifications.filter((notification) =>
          notification.recipents.some(recipent => ((JSON.parse(recipent).user === user.$id) && !(JSON.parse(recipent).read))) || !notification.recipents.some(recipent => ((JSON.parse(recipent).user === user.$id)))
        ).length
      )

    }
  }, [notifications])



  const [logoutConfirmationModal, setLogoutConfirmationModal] = useState(false)







  return (
    <>
      <nav className="sticky z-20 top-0 bg-secondary h-[72px] md:px-4 shadow-md flex items-center justify-between pr-4">
        <div className="flex items-center md:gap-5 gap-3">
          <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:block hidden' onClick={toggleSidebar} />
          <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:hidden' onClick={mobToggleSidebar} />
          <div onClick={handleSearchEnable} className="flex bg-secondaryLight items-center rounded-3xl border-[1px] border-secondary md:px-6 px-4 py-2 md:w-72"><input type="text" className='bg-transparent focus:outline-none w-full md:block hidden placeholder:text-inactive' placeholder='T-Code or Title' /><GoSearch className='text-lg text-inactive' /></div>

        </div>
        <div className="flex md:gap-5 gap-3 items-center">
          {user &&
            <>
              <div onClick={() => setNotificationPanel(!notificationPanel)} className={`flex flex-col ${unreadCount > 0 ? '-mt-2' : ''}  cursor-pointer`}>
                {unreadCount > 0 && <div className="h-4 w-4 bg-primary text-secondary font-semibold relative self-end flex items-center justify-center text-[11px] rounded-xl top-2 left-1">{unreadCount}</div>}
                <IoNotificationsOutline className='text-[24px] text-offBlue transition-colors duration-150' />
              </div>
              <div className={`${notificationPanel ? '' : 'hidden'} text-[15px] absolute flex-col md:w-[28rem] min-h-60 max-h-80 top-[66px] md:right-28 right-4 rounded-[5px] px-2 pt-1 bg-secondary shadow-modal overflow-auto custom-scrollbar flex`}>
                <div className="flex justify-end items-center px-4 py-1"><Link className='text-primary' to={'/notifications'}>Show All ›</Link></div>

                {notifications && notifications.map((notification, index) => (
                  <NotificationTile key={index} notification={notification} />
                ))}

              </div>
            </>
          }
          {user &&
            <div className='flex items-center md:gap-2 gap-1'>
              <div className="hover:bg-secondaryLight cursor-pointer transition-colors duration-200 ease-in-out bg-frameBG md:px-4 px-2 max-sm:text-sm md:py-2 py-[6px] rounded-[5px] text-offBlue border-[0.8px] border-inactive border-opacity-20">
                <div className='flex items-center gap-2'>
                  <img src="/icons/eg_token.svg" alt="" className='h-4 w-auto' />
                  <div className="cursor-pointer">{userDetails && userDetails.eg_token}</div>
                </div>
              </div>
              <div title='Load EG Coins' className="hover:bg-secondaryLight cursor-pointer transition-colors duration-200 ease-in-out bg-frameBG md:px-4 px-2 max-sm:text-sm md:py-2 py-[6px] rounded-[5px] text-offBlue border-[0.8px] border-inactive border-opacity-20">
                <div className='flex items-center gap-2'>
                  <img src="/icons/Coin.svg" alt="" className='h-4 w-auto' />
                  <div className="cursor-pointer">{userDetails && userDetails.eg_coin}</div>
                </div>
              </div>
            </div>
          }
          <div className='group hover:cursor-pointer'>
            {user != null &&
              <>
                <div className="flex items-center gap-2">
                  <img src={userDetails && userDetails.prof_pic_url ? userDetails.prof_pic_url : "/icons/dummyProfilePic.png"} alt="" className='h-8 w-8 rounded-2xl object-cover' />
                  <div className='items-center hidden md:flex'>
                    <label htmlFor="user" className='cursor-pointer'>{userDetails && userDetails.username ? userDetails.username : (user != null && (user.name))}</label>
                    <RiArrowDropDownLine className='text-2xl' />
                  </div>
                </div>
                <div className='absolute flex-col w-40 md:right-0 right-4 rounded-[5px] px-2 py-0 group-hover:py-2 bg-secondary h-0 transition-all duration-200 group-hover:h-fit group-hover:flex'>
                  <Link to={'/profile'}> <div className='px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex'>Profile</div></Link>
                  {user.labels.includes("admin") && <Link to={'/egofficial-admin'}> <div className='px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex'>Admin Dash</div></Link>}
                  <div onClick={() => setLogoutConfirmationModal(true)} className='items-center gap-2 px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex'><span>Logout</span> <IoIosLogOut /></div>
                </div>
              </>
            }
          </div>
          {(user == null && (
            <>
              <Link to={'/login'}><button className='bg-transparent rounded-[5px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>Login</button></Link>
              <Link to={'/signup'}><button className='bg-primary rounded-[5px] text-secondary border-[1px] border-primary px-8 py-2 font-medium'>Signup</button></Link>
            </>
          ))}
        </div>

      </nav>
      <Modal isVisible={searchEnable} onClose={() => setSearchEnable(false)}>
        <Search />
      </Modal>

      <Modal isVisible={logoutConfirmationModal} closeButtonActive={false} >
        <div className='p-6 md:w-96 w-72'>
          <p className='mt-4 flex justify-center'>Are you sure to logout?</p>
          <div className="flex w-full justify-evenly mt-7">
            <button onClick={() => setLogoutConfirmationModal(false)} className='bg-transparent rounded-[3px] text-inactive border-[1px] border-inactive px-8 py-2 font-medium'>No</button>
            <button onClick={logoutUser} className='bg-primary rounded-[3px] text-secondary border-[1px] border-primary px-8 py-2 font-bold'>Yes</button>
          </div>
        </div>
      </Modal>
    </>
  )
}
