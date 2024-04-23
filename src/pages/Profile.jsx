import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { FaCamera, FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircleOutline, IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { storage, ID, database, db_id } from '../../config/Appwrite';


export const Profile = () => {
  const { user, logoutUser, userDetails, setUserDetails } = useAuth();

  const tabs = document.getElementsByClassName("profileTab");
  let [activeTab, setActiveTab] = useState(0);
  const handleTabs = (event) => {
    const index = Array.from(tabs).indexOf(event.target);
    setActiveTab(index);
  }

  useEffect(() => (
    setActiveTab(activeTab)
  ), [activeTab])

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleProfPicInput = async (event) => {
    const pic = event.target.files[0];
    try {
      const response = await storage.createFile(
        'profile_pics',
        ID.unique(),
        pic
      );
      const picDetails = storage.getFileView('profile_pics', response.$id)
      try {
        await database.updateDocument(db_id, 'user_details', user.$id, { 'prof_pic_url': picDetails.href })
        setUserDetails((prevData) => ({
          ...prevData,
          prof_pic_url: picDetails.href
        }))
      } catch (error) {

      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='flex flex-col w-full max-w-[1280px] self-center p-6'>
      <div className="flex">
        <div className="flex gap-4">
          <div className=''>
            <img src={userDetails && userDetails.prof_pic_url ? userDetails.prof_pic_url : "/icons/dummyProfilePic.png"} alt="" className='md:h-[100px] md:w-[100px] h-[70px] w-[70px] rounded-[50%]' />
            <div className='bg-secondaryLight md:p-2 p-1 rounded-[50%] md:text-sm text-[12px] h-fit w-fit relative bottom-7 md:left-16 left-14' >
              <input type="file" id='profileInput' onChange={handleProfPicInput} className='hidden' />
              <label htmlFor='profileInput' className='hover:cursor-pointer' ><FaCamera /></label>
            </div>
          </div>
          <div className="flex flex-col gap-1 md:mt-4 mt-2">
            <h3 className='text-offBlue font-bold md:text-2xl text-xl'>{user.name}</h3>
            {userDetails && userDetails.username ?
              <div htmlFor="" className='text-inactive'>@{userDetails.username}</div>
              : <div htmlFor="" className='text-inactive'>{user.email}</div>
            }
          </div>
        </div>
      </div>


      <div className='mb-6'>
        <div className="flex max-md:justify-between md:gap-8 gap-4 md:text-base text-sm custom-scrollbar overflow-x-auto">
          <div onClick={(e) => handleTabs(e)} className={`profileTab md:text-base text-[12px] ${activeTab === 0 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-bold cursor-pointer`}>Game Profiles</div>
          <div onClick={(e) => handleTabs(e)} className={`profileTab md:text-base text-[12px] ${activeTab === 1 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-bold cursor-pointer`}>Load Balance</div>
          <div onClick={(e) => handleTabs(e)} className={`profileTab md:text-base text-[12px] ${activeTab === 2 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-bold cursor-pointer`}>Withdraw</div>
          <div onClick={(e) => handleTabs(e)} className={`profileTab md:text-base text-[12px] ${activeTab === 3 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-bold cursor-pointer`}>Account Details</div>
        </div>
        <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
      </div>

      <div className="flex flex-col w-full">

        {activeTab === 0 &&
          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
              <div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px]">
                <div className="flex items-center gap-2 ">
                  <div className='h-14 w-14 bg-[url("/images/FF_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                  <div className="flex flex-col">
                    <h4 className='font-bold text-offWhite md:text-xl text-lg'>SanjivFF</h4>
                    <h5 className='text-inactive font-medium'>UID: <span>478916489</span></h5>
                  </div>
                </div>
                <FaRegEdit className='text-inactive cursor-pointer' />
              </div>
              <div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px]">
                <div className="flex items-center gap-2 ">
                  <div className='h-14 w-14 bg-[url("/images/Pubg_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                  <div className="flex flex-col">
                    <h4 className='font-bold text-offWhite md:text-xl text-lg'>RajivPUBG</h4>
                    <h5 className='text-inactive font-medium'>UID: <span>7326598</span></h5>
                  </div>
                </div>
                <FaRegEdit className='text-inactive cursor-pointer' />
              </div>
              <div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px]">
                <div className="flex items-center gap-2 ">
                  <div className='h-14 w-14 bg-[url("/images/Valorant_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                  <div className="flex flex-col">
                    <h4 className='font-bold text-offWhite md:text-xl text-lg'>TenZ</h4>
                    <h5 className='text-inactive font-medium'>UID: <span>46207124</span></h5>
                  </div>
                </div>
                <FaRegEdit className='text-inactive cursor-pointer' />
              </div>
              <div className="flex col-span-1 cursor-pointer hover:bg-secondaryLight transition-colors duration-150 justify-center items-center p-3 bg-secondary rounded-[5px]">
                <div className="flex gap-2 items-center text-offBlue">
                  <IoIosAddCircleOutline className='text-xl' />
                  <span>Add New Game</span>
                </div>
              </div>
            </div>
          </>
        }
        {activeTab === 1 &&
          <>
            Load balance
          </>
        }
        {activeTab === 2 &&
          <>
            Withdraw
          </>
        }
        {activeTab === 3 &&
          <>
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-6">
                <div className='flex flex-col gap-[2px]'>
                  <div className='text-inactive'>Name</div>
                  <strong className='text-offBlue'>{user.name}</strong>
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <div className='text-inactive'>Username</div>
                  {userDetails && userDetails.username ?
                    <strong className='text-offBlue'>{userDetails.username}</strong>
                    : <div className='text-offBlue'>Choose a username</div>
                  }
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <div className='text-inactive'>Email</div>
                  <strong className='text-offBlue'>{user.email}</strong>
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <div className='text-inactive'>Joined On</div>
                  <strong className='text-offBlue'>{formatDate(user.registration)}</strong>
                </div>
                <div className='flex flex-col gap-[2px]'>
                  <div className='text-inactive'>Account Status</div>
                  <strong className={`text-offBlue w-fit text-sm px-4 py-1 font-medium bg-opacity-30 rounded-[15px] ${user.status ? 'bg-green-700' : 'bg-red-700'}`}>{user.status ? 'Active' : 'Closed'}</strong>
                </div>
                <button onClick={logoutUser} className='self-start border-[0.8px] border-inactive border-opacity-30 rounded-[5px] px-3 py-1 text-offBlue flex items-center gap-2'><span>Logout</span><IoIosLogOut /></button>
              </div>
              <FaRegEdit className='text-inactive text-xl cursor-pointer' />
            </div>
          </>
        }
      </div>

      <Link to={'#'} className='md:h-[220px] h-[120px] w-full bg-[url("/images/DummySliderBanner.jpg")] mt-6 bg-cover rounded-[5px] bg-center'>

      </Link>


    </div>
  )
}
