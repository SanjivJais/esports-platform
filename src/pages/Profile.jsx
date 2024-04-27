import React, { useContext, useEffect, useState } from 'react'
import { useAuth } from '../utils/AuthContext'
import { FaCamera, FaRegEdit } from 'react-icons/fa';
import { IoIosAddCircleOutline, IoIosLogOut } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { storage, ID, database, db_id, account } from '../../config/Appwrite';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { Modal } from '../components/Modal';
import { MdDelete } from 'react-icons/md';
import LoadingBar from 'react-top-loading-bar';
import GameProfileContext from '../utils/GameProfileContext';
import { TbTournament } from 'react-icons/tb';
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard';


export const Profile = () => {

  const { user, setUser, logoutUser, userDetails, setUserDetails } = useAuth();
  const { ffProfile, setFFProfile, pubgProfile, setPUBGProfile } = useContext(GameProfileContext);

  // adding top bar loading effect
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(50)
    setProgress(70)
    setTimeout(() => {
      setProgress(100)
    }, 700)
  }, [])


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
      toast.info("Choose another name")
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
        toast.success("Username claimed");
      } catch (error) {
        if (error.code == '409')
          toast.error("Username already taken, choose another")
        else
          toast.error(error.message)
      }
    }
    setUsernameChangeEnable(false)
  }

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

  // game profile creation 
  const handleFFProfileInput = (event) => {
    setFFProfile((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }
  const createFFProfile = async () => {
    setProgress(40)
    if (userDetails && !userDetails.ff_profile) {
      if (ffProfile && ffProfile.ff_name != '' && ffProfile.ff_uid != '') {
        try {
          await database.createDocument(db_id, 'ff_profiles', user.$id, ffProfile)
          await database.updateDocument(db_id, 'user_details', user.$id, { 'ff_profile': true })
          setUserDetails((prevData) => ({
            ...prevData,
            ff_profile: true
          }))
          setProgress(70)
          toast.success("Free Fire profile created")
          setGameProfileModal(false)
        } catch (error) {
          toast.error("An error occurred")
        }
      } else {
        toast.info("Free Fire name or UID missing!")
      }
    }
    setProgress(100)

  }

  const handlePubgProfileInput = (event) => {
    setPUBGProfile((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))

  }
  const createPubgProfile = async () => {
    setProgress(40)
    if (userDetails && !userDetails.pubg_profile) {
      if (pubgProfile && pubgProfile.pubg_name != '' && pubgProfile.pubg_uid != '') {
        try {
          await database.createDocument(db_id, 'pubg_profiles', user.$id, pubgProfile)
          await database.updateDocument(db_id, 'user_details', user.$id, { 'pubg_profile': true })
          setUserDetails((prevData) => ({
            ...prevData,
            pubg_profile: true
          }))
          setProgress(70)

          setGameProfileModal(false)
          toast.success("PUBG Mobile profile created")
        } catch (error) {
          toast.error("An error occurred")
        }
      } else {
        toast.info("PUBG Mobile name or UID missing!")
      }
    }
    setProgress(100)
  }

  // game profile deletion
  const [deleteFFProfileModal, setDeleteFFProfileModal] = useState(false)
  const handleFFProfileDeletion = async () => {
    setProgress(40)
    try {
      await database.deleteDocument(db_id, 'ff_profiles', user.$id)
      try {
        await database.updateDocument(db_id, 'user_details', user.$id, { 'ff_profile': false })
        setUserDetails((prevData) => ({
          ...prevData,
          ff_profile: false
        }))
        setProgress(70)
        setFFProfile(null)
        setDeleteFFProfileModal(false);
      } catch (error) {
        toast.error("An error occurred")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
    setProgress(100)
  }

  const [deletePubgProfileModal, setDeletePubgProfileModal] = useState(false)
  const handlePubgProfileDeletion = async () => {
    setProgress(40)
    try {
      await database.deleteDocument(db_id, 'pubg_profiles', user.$id)
      try {
        await database.updateDocument(db_id, 'user_details', user.$id, { 'pubg_profile': false })
        setUserDetails((prevData) => ({
          ...prevData,
          pubg_profile: false
        }))
        setProgress(70)
        setPUBGProfile(null)
        setDeletePubgProfileModal(false);
      } catch (error) {
        toast.error("An error occurred")
      }
    } catch (error) {
      toast.error("An error occurred")
    }
    setProgress(100)

  }

  // game profile edits 
  const [ffProfileEditEnable, setFFProfileEditEnable] = useState(false)
  const ffProfileEdit = async () => {
    const ffProfileEditName = document.getElementById('ffProfileEditName').value
    const ffProfileEditUID = document.getElementById('ffProfileEditUID').value
    if (ffProfileEditName != '' && ffProfileEditUID != '') {
      try {
        await database.updateDocument(db_id, 'ff_profiles', user.$id, { 'ff_name': ffProfileEditName, 'ff_uid': ffProfileEditUID })
        setFFProfile({
          'ff_name': ffProfileEditName,
          'ff_uid': ffProfileEditUID
        })
        toast.success("Profile updated")
        setFFProfileEditEnable(false)
      } catch (error) {
        toast.error("An error occurred")
      }
    }
    else
      toast.info('One or more fields are empty')
  }

  const [pubgProfileEditEnable, setPubgProfileEditEnable] = useState(false)
  const pubgProfileEdit = async () => {
    const pubgProfileEditName = document.getElementById('pubgProfileEditName').value
    const pubgProfileEditUID = document.getElementById('pubgProfileEditUID').value
    if (pubgProfileEditName != '' && pubgProfileEditUID != '') {
      try {
        await database.updateDocument(db_id, 'pubg_profiles', user.$id, { 'pubg_name': pubgProfileEditName, 'pubg_uid': pubgProfileEditUID })
        setPUBGProfile({
          'pubg_name': pubgProfileEditName,
          'pubg_uid': pubgProfileEditUID
        })
        toast.success("Profile updated")
        setPubgProfileEditEnable(false)
      } catch (error) {
        toast.error("An error occurred")
      }
    }
    else
      toast.info('One or more fields are empty')
  }


  // fetching joined FF tournaments
  const [joinedFFTournaments, setJoinedFFTournaments] = useState([])
  useEffect(() => {
    if (userDetails) {
      const fetchJoinedFFTournaments = async () => {
        try {
          const tournamentPromises = userDetails.ffTournaments.map(async tournID => {
            const tournDetail = await database.getDocument(db_id, 'ff_tournaments', tournID, []);
            return tournDetail;
          });
          const tournamentsData = await Promise.all(tournamentPromises);
          setJoinedFFTournaments(tournamentsData);
        } catch (error) {
          toast.error("Error occurred loading joined tournaments")
        }
      }
      fetchJoinedFFTournaments()
    }
  }, [userDetails])


  return (
    <>
      <LoadingBar
        color='#F88B26'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Helmet>
        <title>Profile - EsportsGravity</title>
        <meta name="robots" content="noindex" />
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
                <div className='text-inactive'>@{userDetails.username}</div>
                : <>
                  {usernameChangeEnable ?
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2">
                        <input onChange={handleUsernameinput} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' placeholder="Create a username" type="text" name="" id="" />
                        <button onClick={handleUsernameEdit} className='bg-primary px-2 py-1 rounded-[5px] text-secondary text-sm font-bold'>Claim</button>
                        <button onClick={() => setUsernameChangeEnable(false)} className='bg-secondaryLight px-2 py-1 rounded-[5px] text-inactive text-sm font-bold'>Cancel</button>
                      </div>
                      <div className='text-sm text-inactive '>*Username cannot be changed later!</div>
                    </div>
                    :
                    <div onClick={() => setUsernameChangeEnable(true)} className='text-primary cursor-pointer'>Claim username</div>
                  }</>
              }
            </div>
          </div>
        </div>

        <div className='mb-6'>
          <div className="flex max-md:justify-between md:gap-8 gap-4 custom-scrollbar whitespace-nowrap overflow-x-auto">
            <div onClick={(e) => handleTabs(e)} className={`profileTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Tournaments</div>
            <div onClick={(e) => handleTabs(e)} className={`profileTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Game Profiles</div>
            <div onClick={(e) => handleTabs(e)} className={`profileTab ${activeTab === 2 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Add Funds</div>
            <div onClick={(e) => handleTabs(e)} className={`profileTab ${activeTab === 3 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Withdraw</div>
            <div onClick={(e) => handleTabs(e)} className={`profileTab ${activeTab === 4 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Account Details</div>
          </div>
          <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
        </div>

        <div className="flex flex-col w-full">

          {activeTab === 0 &&
            <>
              {joinedFFTournaments.length >= 1 ?
                <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">{joinedFFTournaments.map((tournament, index) => (
                  <FFSquareTournamentCard key={index}
                    tournament={tournament}
                  />
                ))}</div>
                :
                <div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
                  <div className='flex flex-col gap-3 items-center'>
                    <TbTournament className='text-4xl' />
                    You haven't joined any tournament!
                    <Link to={'/tournaments'}><button className='bg-primary text-secondary px-3 py-2 rounded-[5px] font-semibold'>Explore Tournaments</button></Link>
                  </div>
                </div>}
            </>
          }

          {activeTab === 1 &&
            <>
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6 w-full">
                {userDetails && userDetails.ff_profile && ffProfile &&
                  (<div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px] group">
                    <div className="flex items-center gap-2 ">
                      <div className='h-14 w-14 bg-[url("/images/FF_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>
                      <div className={`flex flex-col ${ffProfileEditEnable ? 'gap-2' : ''}`}>
                        {ffProfileEditEnable ?
                          (<input id='ffProfileEditName' type='text' placeholder={ffProfile.ff_name} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />)
                          : <h4 className='font-bold text-offWhite md:text-xl'>{ffProfile.ff_name}</h4>
                        }
                        {ffProfileEditEnable ?
                          (<input id='ffProfileEditUID' type='text' placeholder={ffProfile.ff_uid} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />)
                          : <h5 className='text-inactive font-medium'>FF UID: <span>{ffProfile.ff_uid}</span></h5>
                        }
                        {ffProfileEditEnable && <>
                          <div className="flex gap-2 text-sm">
                            <button onClick={ffProfileEdit} className='px-2 py-1 rounded-[5px] bg-primary text-secondary font-semibold'>Update</button>
                            <button onClick={() => setFFProfileEditEnable(false)} className='px-2 py-1 rounded-[5px] bg-secondaryLight'>Cancel</button>
                          </div>
                        </>}
                      </div>
                    </div>
                    <div className="md:hidden md:group-hover:flex flex gap-1 text-inactive">
                      <FaRegEdit onClick={() => setFFProfileEditEnable(true)} className='cursor-pointer' />
                      <MdDelete onClick={() => setDeleteFFProfileModal(true)} className='cursor-pointer' />
                    </div>
                  </div>)
                }
                {userDetails && userDetails.pubg_profile && pubgProfile &&
                  (<div className="flex justify-between col-span-1 p-3 bg-secondary rounded-[5px] group">
                    <div className="flex items-center gap-2 ">
                      <div className='h-14 w-14 bg-[url("/images/Pubg_icon_game_profile.jpg")] bg-center bg-cover rounded-[5px]'></div>

                      <div className={`flex flex-col ${pubgProfileEditEnable ? 'gap-2' : ''}`}>
                        {pubgProfileEditEnable ?
                          (<input id='pubgProfileEditName' type='text' placeholder={pubgProfile.pubg_name} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />)
                          : <h4 className='font-bold text-offWhite md:text-xl'>{pubgProfile.pubg_name}</h4>
                        }
                        {pubgProfileEditEnable ?
                          (<input id='pubgProfileEditUID' type='text' placeholder={pubgProfile.pubg_uid} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />)
                          : <h5 className='text-inactive font-medium'>PUBG UID: <span>{pubgProfile.pubg_uid}</span></h5>
                        }
                        {pubgProfileEditEnable && <>
                          <div className="flex gap-2 text-sm">
                            <button onClick={pubgProfileEdit} className='px-2 py-1 rounded-[5px] bg-primary text-secondary font-semibold'>Update</button>
                            <button onClick={() => setPubgProfileEditEnable(false)} className='px-2 py-1 rounded-[5px] bg-secondaryLight'>Cancel</button>
                          </div>
                        </>}
                      </div>
                    </div>
                    <div className="md:group-hover:flex md:hidden flex gap-1 text-inactive">
                      <FaRegEdit onClick={() => setPubgProfileEditEnable(true)} className='cursor-pointer' />
                      <MdDelete onClick={() => setDeletePubgProfileModal(true)} className='cursor-pointer' />
                    </div>
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
          {activeTab === 2 &&
            <>
              Load balance
            </>
          }
          {activeTab === 3 &&
            <>
              Withdraw
            </>
          }
          {activeTab === 4 &&
            <>
              <div className="flex w-full justify-between">
                <div className="flex flex-col gap-6">
                  <div className='flex flex-col gap-[2px]'>
                    <div className='text-inactive flex items-center gap-2'><span>Name</span><FaRegEdit onClick={() => setNameChangeEnable(true)} className='cursor-pointer' /></div>
                    {nameChangeEnable ?
                      <div className="flex gap-2">
                        <input onChange={handleNameInput} className='bg-transparent px-2 py-1 focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' placeholder={user.name} type="text" name="" id="" />
                        <button onClick={handleNameEdit} className='bg-primary px-2 py-1 rounded-[5px] text-secondary text-sm font-bold'>Update</button>
                        <button onClick={() => setNameChangeEnable(false)} className='bg-secondaryLight px-2 py-1 rounded-[5px] text-inactive text-sm font-bold'>Cancel</button>
                      </div>
                      : <strong className='text-offBlue'>{user.name}</strong>
                    }
                  </div>
                  <div className='flex flex-col gap-[2px]'>
                    <div className='text-inactive flex items-center gap-2'>Username</div>
                    {userDetails && userDetails.username ?
                      <strong className='text-offBlue'>{userDetails.username}</strong>
                      : <>Not claimed</>
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
            <select onChange={handleGameSelection} name="" id="gameSelection" className='custom-dropdown bg-secondaryLight'>
              <option value="">Select game</option>
              {userDetails && !userDetails.ff_profile && <option value="freefire">Free Fire</option>}
              {userDetails && !userDetails.pubg_profile && <option value="pubgmobile">PUBG Mobile</option>}
            </select>

            {/* free fire profile   */}
            <div id='ffProfileSetup' className="hidden flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>In-game Name</div>
                <input onChange={handleFFProfileInput} name='ff_name' type="text" placeholder='Your name in Free Fire' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
                <span className='text-[12px] text-offBlue'>(<span className='text-primary'> Note: </span>This name should match the actual in-game name as far as possible, including styles. )</span>
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>UID</div>
                <input onChange={handleFFProfileInput} name='ff_uid' type="text" placeholder='Your Free Fire UID' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <button onClick={createFFProfile} className='bg-primary px-2 py-2 rounded-[5px] text-secondary text-sm font-bold'>Create Profile</button>
            </div>

            {/* pubg profile setup */}
            <div id='pubgProfileSetup' className="hidden flex-col gap-3">
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>In-game Name</div>
                <input onChange={handlePubgProfileInput} name='pubg_name' type="text" placeholder='Your name in PUBG Mobile' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <div className='flex flex-col gap-1'>
                <div className='text-sm text-inactive'>UID</div>
                <input onChange={handlePubgProfileInput} name='pubg_uid' type="text" placeholder='Your PUBG Mobile UID' className='bg-transparent px-2 py-1 text-offBlue focus:outline-none border-[0.8px] border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive rounded-[5px]' />
              </div>
              <button onClick={createPubgProfile} className='bg-primary px-2 py-2 rounded-[5px] text-secondary text-sm font-bold'>Create Profile</button>
            </div>


          </div>
        </div>
      </Modal>

      <Modal isVisible={deleteFFProfileModal} onClose={() => setDeleteFFProfileModal(false)}>
        <div className='w-64 py-4 px-6 flex flex-col content-center'>
          <div className='my-8 flex flex-col gap-3'>
            <div className='text-center'>Are you sure you want to remove your Free Fire profile?</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setDeleteFFProfileModal(false)} className='px-3 py-2 rounded-[5px] bg-secondaryLight'>No</button>
              <button onClick={handleFFProfileDeletion} className='px-3 py-2 rounded-[5px] bg-primary text-secondary'>Yes</button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal isVisible={deletePubgProfileModal} onClose={() => setDeletePubgProfileModal(false)}>
        <div className='w-64 py-4 px-6 flex flex-col content-center'>
          <div className='my-8 flex flex-col gap-3'>
            <div className='text-center'>Are you sure you want to remove your PUBG Mobile profile?</div>
            <div className="flex gap-4 justify-center">
              <button onClick={() => setDeletePubgProfileModal(false)} className='px-3 py-2 rounded-[5px] bg-secondaryLight'>No</button>
              <button onClick={handlePubgProfileDeletion} className='px-3 py-2 rounded-[5px] bg-primary text-secondary'>Yes</button>
            </div>
          </div>
        </div>
      </Modal>


    </>
  )
}
