import React, { useState } from 'react'
import { MdOutlineMenu } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoSearch } from "react-icons/go";
import { useAuth } from '../utils/AuthContext';
import { Modal } from './Modal';
import { FFSquareTournamentCard } from './FFComps/FFSquareTournamentCard';
import { RiArrowDropDownLine } from 'react-icons/ri';
import { IoIosLogOut } from 'react-icons/io';
import { IoWallet } from 'react-icons/io5';


export const Navbar = ({ toggleSidebar, mobToggleSidebar }) => {

  // tournament data for the search results | steps: first select the game then input tournament id for search
  // example of Free Fire search results
  const FFtournaments = [
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
      id: 'op23no90284#nod00',
      gameTitle: 'Free Fire',
      imgURL: 'https://freefiremobile-a.akamaihd.net/common/web_event/official2.ff.garena.all/img/20228/9f72d23636bc8b9188a21fb62a0d3742.jpg',
      tournTitle: 'EG Summar Clash #1',
      maxPlayers: 48,
      minPlayers: 25,
      joinedPlayers: 40,
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
      status: 'Closed',
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
      <nav className="sticky z-20 top-0 bg-secondary h-[72px] md:px-4 shadow-md flex items-center justify-between pr-4">
        <div className="flex items-center gap-5">
          <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:block hidden' onClick={toggleSidebar} />
          <MdOutlineMenu className='text-2xl hover:cursor-pointer md:ml-0 ml-4 lg:hidden' onClick={mobToggleSidebar} />
          <div onClick={handleSearchEnable} className="flex bg-secondaryLight items-center rounded-3xl border-[1px] border-secondary md:px-6 px-4 py-2 md:w-72"><input type="text" className='bg-transparent focus:outline-none w-full md:block hidden placeholder:text-inactive' placeholder='Tournament ID or Title' /><GoSearch className='text-lg text-inactive' /></div>
        </div>
        <div className="flex gap-5 items-center">
          {user &&
            <div title='Load EG Coins' className="hover:bg-secondaryLight cursor-pointer transition-colors duration-200 ease-in-out bg-frameBG px-4 py-2 rounded-[5px] text-offBlue border-[0.8px] border-inactive border-opacity-20">
              <div className='flex items-center gap-2'>
                <img src="/icons/Coin.svg" alt="" className='h-4 w-auto' />
                <label htmlFor="" className="cursor-pointer">340</label>
              </div>
            </div>
          }
          <div className='group hover:cursor-pointer'>
            {user != null &&
              <>
                <div className="flex items-center gap-2">
                  <img src="/icons/dummyProfilePic.png" alt="" className='h-8 w-auto rounded-2xl' />
                  <div className='items-center hidden md:flex'>
                    <label htmlFor="user">{(user != null && (user.name))}</label>
                    <RiArrowDropDownLine className='text-2xl' />
                  </div>
                </div>
                <div className='absolute flex-col w-40 md:right-0 right-4 rounded-[5px] px-2 py-0 group-hover:py-2 bg-secondary h-0 transition-all duration-200 group-hover:h-fit group-hover:flex'>
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
          <div className="flex items-center mt-16 mb-10 md:w-[70%] w-[90%] rounded-3xl bg-secondaryLight h-12">
            <select name="" id="" className='bg-transparent focus:outline-none text-offBlue md:mx-6 mx-1'>
              <option value="freefire" selected className='bg-secondaryLight'>Free Fire</option>
              <option value="pubg" className='bg-secondaryLight'>PUBG Mobile</option>
            </select>
            <span className='h-full w-[0.8px] bg-inactive bg-opacity-30'></span>
            <div className="flex gap-2 items-center md:px-6 px-2 py-2 h-full w-full">
              <input type="text" className='bg-transparent text-offBlue focus:outline-none w-full placeholder:text-inactive' placeholder='Tournament ID or Title' />
            </div>
            <span className='h-full w-[0.8px] bg-inactive bg-opacity-20'></span>
            <div className='md:px-6 px-2 hover:bg-frameBG h-full flex items-center cursor-pointer rounded-tr-3xl rounded-br-3xl transition-colors duration-200'><GoSearch className='text-lg text-inactive' /></div>
          </div>
          <div className='overflow-auto mb-6 grid md:grid-cols-2 grid-cols-1 w-full gap-8 custom-scrollbar md:px-10 px-2'>
            {/* search results here  */}
            {FFtournaments && FFtournaments.map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}
          </div>
        </div>
      </Modal>
    </>
  )
}
