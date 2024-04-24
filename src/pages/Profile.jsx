import React, { useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { FaCamera, FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircleOutline, IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { storage, ID, database, db_id, account } from '../../config/Appwrite';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Modal } from '../components/Modal';



export const Profile = () => {

  const { user, setUser, logoutUser, userDetails, setUserDetails } = useAuth();

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
        toast.error(error.message);
      }
    } catch (error) {
      if (error.message == "File size not allowed")
        toast.error("Image must be less than 2MB");
      else
        toast.error(error.message);
    }
  }

  const [nameChange, setNameChange] = useState(user.name);
  const [nameChangeEnable, setNameChangeEnable] = useState(false)
  const handleNameInput = (event) => {
    setNameChange(event.target.value);
  }

  const handleNameEdit = async () => {
    if (nameChange != '' && nameChange != user.name) {
      try {
        await account.updateName(nameChange)
        setUser((prevData) => ({
          ...prevData,
          name: nameChange
        }))

        toast.success("Name changed successfully");
      } catch (error) {
        toast.error(error.message)
      }
    }
    else {
      toast.error("Choose another name")
    }
    setNameChangeEnable(false)
  }

  const [usernameChange, setUsernameChange] = useState(null);
  const [usernameChangeEnable, setUsernameChangeEnable] = useState(false)
  const handleUsernameinput = (event) => {
    setUsernameChange(event.target.value);
  }

  const handleUsernameEdit = async () => {
    if (usernameChange != null && usernameChange != '') {
      try {
        await database.updateDocument(db_id, 'user_details', user.$id, { 'username': usernameChange })
        setUserDetails((prevData) => ({
          ...prevData,
          username: usernameChange
        }))
        toast.success("Username changed successfully");
      } catch (error) {
        if (error.code == '409')
          toast.error("Username already exists, choose another")
        else
          toast.error(error.message)
      }
    }
    setUsernameChangeEnable(false)
  }

  const [ffProfile, setFFProfile] = useState(null)
  const [pubgProfile, setPUBGProfile] = useState(null)
  useEffect(() => {
    if (userDetails && userDetails.ff_profile) {
      const getFFProfile = async () => {
        try {
          const ffprofile = await database.getDocument(db_id, 'ff_profiles', user.$id)
          setFFProfile(ffprofile);
        } catch (error) {
          toast.error(error.message)
        }
      }
      getFFProfile();
    }
    if (userDetails && userDetails.pubg_profile) {
      const getPubgProfile = async () => {
        try {
          const pubgprofile = await database.getDocument(db_id, 'pubg_profiles', user.$id)
          setPUBGProfile(pubgprofile);
        } catch (error) {
          toast.error(error.message)
        }
      }
      getPubgProfile();
    }

  }, [user, userDetails])

  const [gameProfileModal, setGameProfileModal] = useState(false)
  const handleGameProfileModal = () => { setGameProfileModal(!gameProfileModal) }

  const handleGameSelection = (event) => {
    let selection = event.target.value;
    let ffProfileSetup = document.getElementById('ffProfileSetup')
    let pubgProfileSetup = document.getElementById('pubgProfileSetup')
    if (selection != '') {
      if (selection == 'freefire') {
        ffProfileSetup.style.display = 'flex';
        pubgProfileSetup.style.display = 'none';
      }
      else {
        ffProfileSetup.style.display = 'none';
        pubgProfileSetup.style.display = 'flex';
      }
    } else {
      ffProfileSetup.style.display = 'none';
      pubgProfileSetup.style.display = 'none';
    }
  }


  return (
    <>
      <Helmet>
        <title>Profile - EsportsGravity</title>
      </Helmet>
      <div className='flex flex-col w-full max-w-[1280px] self-center p-6'>
        <div className="flex">
          <div className="flex gap-4">
            <div className=''>
              <img src={userDetails && userDetails.prof_pic_url ? userDetails.prof_pic_url : "/icons/dummyProfilePic.png"} alt="" className='md:h-[100px] md:w-[100px] h-[70px] w-[70px] rounded-[50%] object-cover' />
              <div className='bg-secondaryLight md:p-2 p-1 rounded-[50%] md:text-sm text-[12px] h-fit w-fit relative bottom-7 md:left-16 left-14' >
                <input type="file" accept=".jpg, .jpeg, .png, .svg" id='profileInput' onChange={handleProfPicInput} className='hidden' />
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
                {ffProfile &&
                  (<div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px]">
                    <div className="flex items-center gap-2 ">
                      <div className='h-14 w-14 bg-[url("/images/FF_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                      <div className="flex flex-col">
                        <h4 className='font-bold text-offWhite md:text-xl text-lg'>{ffProfile.ff_name}</h4>
                        <h5 className='text-inactive font-medium'>UID: <span>{ffProfile.ff_uid}</span></h5>
                      </div>
                    </div>
                    <FaRegEdit className='text-inactive cursor-pointer' />
                  </div>)
                }
                {pubgProfile &&
                  (<div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px]">
                    <div className="flex items-center gap-2 ">
                      <div className='h-14 w-14 bg-[url("/images/Pubg_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                      <div className="flex flex-col">
                        <h4 className='font-bold text-offWhite md:text-xl text-lg'>{pubgProfile.pubg_name}</h4>
                        <h5 className='text-inactive font-medium'>UID: <span>{pubgProfile.pubg_uid}</span></h5>
                      </div>
                    </div>
                    <FaRegEdit className='text-inactive cursor-pointer' />
                  </div>)
                }
                <div onClick={handleGameProfileModal} className="flex col-span-1 cursor-pointer hover:bg-secondaryLight transition-colors duration-150 justify-center items-center p-3 bg-secondary rounded-[5px]">
                  <div className="flex gap-2 items-center text-offBlue">
                    <IoIosAddCircleOutline className='text-xl' />
                    <span>Create Game Profile</span>
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
                    <div className='text-inactive flex items-center gap-2'><span>Name</span><FaRegEdit onClick={() => setNameChangeEnable(true)} className='cursor-pointer' /></div>
                    {nameChangeEnable ?
                      <div className="flex gap-2">
                        <input onChange={handleNameInput} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' placeholder={user.name} type="text" name="" id="" />
                        <button onClick={handleNameEdit} className='bg-primary px-2 py-1 rounded-[5px] text-secondary text-sm font-bold'>Update</button>
                      </div>
                      : <strong className='text-offBlue'>{user.name}</strong>
                    }
                  </div>
                  <div className='flex flex-col gap-[2px]'>
                    <div className='text-inactive flex items-center gap-2'><span>Username</span>{userDetails && userDetails.username == null && <FaRegEdit onClick={() => setUsernameChangeEnable(true)} className='cursor-pointer' />}</div>
                    {userDetails && userDetails.username ?
                      <strong className='text-offBlue'>{userDetails.username}</strong>
                      : <>{usernameChangeEnable ?
                        <div className="flex flex-col gap-1">
                          <div className="flex gap-2">
                            <input onChange={handleUsernameinput} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' placeholder="Choose a username" type="text" name="" id="" />
                            <button onClick={handleUsernameEdit} className='bg-primary px-2 py-1 rounded-[5px] text-secondary text-sm font-bold'>Update</button>
                          </div>
                          <div className='text-sm text-inactive '>*Username cannot be changed later!</div>
                        </div>
                        : <div className='text-offBlue'>Choose a username</div>
                      }</>
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
              </div>
            </>
          }
        </div>

        <Link to={'#'} className='md:h-[220px] h-[120px] w-full bg-[url("/images/DummySliderBanner.jpg")] mt-6 bg-cover rounded-[5px] bg-center'>

        </Link>
      </div>

      <Modal isVisible={gameProfileModal} onClose={() => setGameProfileModal(false)}>
        <div className='w-72 px-4'>
          <div className="flex flex-col my-12 mx-6 gap-3">
            <select onChange={handleGameSelection} name="" id="gameSelection" className='custom-dropdown'>
              <option value="">Select game</option>
              <option value="freefire">Free Fire</option>
              <option value="pubgmobile">PUBG Mobile</option>
            </select>

            <div id='ffProfileSetup' className="hidden flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>In-game Name</div>
                <input type="text" placeholder='Your name in Free Fire' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>UID</div>
                <input type="text" placeholder='Your Free Fire UID' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <button className='bg-primary px-2 py-2 rounded-[5px] text-secondary text-sm font-bold'>Create Profile</button>
            </div>

            <div id='pubgProfileSetup' className="hidden flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>In-game Name</div>
                <input type="text" placeholder='Your name in PUBG Mobile' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>UID</div>
                <input type="text" placeholder='Your PUBG Mobile UID' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <button className='bg-primary px-2 py-2 rounded-[5px] text-secondary text-sm font-bold'>Create Profile</button>
            </div>


          </div>
        </div>
      </Modal>

    </>
  )
}
