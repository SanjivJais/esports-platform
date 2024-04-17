import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useAuth } from '../utils/AuthContext';
import { Modal } from './Modal';
import { SquareTournamentCard } from './SquareTournamentCard';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';



export const Navbar = ({ toggleSidebar, mobToggleSidebar }) => {

  // tournament data for the search results 
  const tournaments = [
    {
      gameTitle: 'Free Fire',
      imgURL: 'https://dl.dir.freefiremobile.com/common/web_event/official2.ff.garena.all/202210/0b8cb561ac88828c2d09bb7d86158255.jpg',
      maxPlayers: 48,
      minPlayers: 25,
      joinedPlayers: 30,
      entryFree: 10,
      gameMode: 'Clash Squad',
      gameType: 'Squad',
      rewardType: 'coin',
      firstPrize: 70,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 3, 2024',
      startTime: '2:00 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      watchLiveURL2: '',
      rulesDetails: '',
    },
    {
      gameTitle: 'PUBG Mobile',
      imgURL: 'https://w0.peakpx.com/wallpaper/189/508/HD-wallpaper-pubg-squad.jpg',
      maxPlayers: 100,
      minPlayers: 80,
      joinedPlayers: 90,
      entryFree: 0,
      gameMode: 'BR',
      gameType: 'Squad',
      rewardType: 'coin',
      firstPrize: 50,
      secondPrize: 20,
      thirdPrize: 10,
      startDate: 'May 4, 2024',
      startTime: '3:30 PM',
      host: 'EsportsGravity',
      status: 'Open',
      roomID: '',
      roomPass: '',
      ytLiveURL: '',
      watchLiveURL2: '',
      rulesDetails: '',
    },

  ]


  const { user, logoutUser } = useAuth();
  const [searchEnable, setSearchEnable] = useState(null);
  const handleSearchEnable = () => { setSearchEnable(!searchEnable); }
  return (
    <>
      <nav className="sticky z-20 top-0 bg-secondary h-[72px] md:px-6 shadow-md flex items-center justify-between pl-0 pr-6">
        <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:block hidden' onClick={toggleSidebar} />
        <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:hidden' onClick={mobToggleSidebar} />

        <div className="flex gap-3 items-center">
          <div onClick={handleSearchEnable} className="flex bg-secondaryLight items-center rounded-[5px] border-[1px] border-secondary md:px-6 px-4 py-2"><input type="text" className='bg-transparent focus:outline-none w-full md:block hidden placeholder:text-inactive' placeholder='Tournament ID or Title' /><GoSearch className='text-lg text-inactive' /></div>
          <div className='group hover:cursor-pointer'>
            {user != null &&
              <>
                <div className="flex items-center gap-2">
                  <img src="/icons/dummyProfilePic.png" alt="" className='h-8 w-auto rounded-2xl' />
                  <div className='flex items-center'>
                    <label htmlFor="user">{(user != null && (user.name))}</label>
                    <RiArrowDropDownLine className='text-2xl' />
                  </div>
                </div>
                <div className='absolute flex-col w-40 rounded-[5px] px-2 py-0 group-hover:py-2 bg-secondary h-0 transition-all duration-200 group-hover:h-fit group-hover:flex'>
                  <Link to={'/profile'}> <div className='px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex'>Profile</div></Link>
                  <div onClick={logoutUser} className='items-center gap-2 px-2 py-2 hover:bg-secondaryLight cursor-pointer rounded-[5px] hidden group-hover:flex'><span>Logout</span> <IoIosLogOut /></div>
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

        <div className='md:w-[75vw] w-[90vw] h-[95vh] flex flex-col items-center'>
          <div className="flex mt-16 mb-10 md:w-[70%] w-[80%] rounded-3xl bg-secondaryLight items-center border-[1px] border-secondary px-6 py-2"><input type="text" className='bg-transparent text-offBlue texxt-sm focus:outline-none w-full placeholder:text-inactive' placeholder='Tournament ID or Title' /><GoSearch className='text-lg text-inactive' /></div>
          <div className='overflow-auto mb-6 grid md:grid-cols-2 grid-cols-1 md:w-[80%] w-full gap-8 custom-scrollbar px-2'>
            {tournaments && tournaments.map((tournament, index) => (
              <SquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}
          </div>

        </div>
      </Modal>
    </>
  )
}
