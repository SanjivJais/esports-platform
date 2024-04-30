import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import LoadingBar from 'react-top-loading-bar'
import { Helmet } from 'react-helmet'
import { ID, database, db_id } from '../../config/Appwrite';
import { useAuth } from '../utils/AuthContext'
import { toast } from 'react-toastify'
import { Query } from 'appwrite'


export const FFTournaments = () => {
  const { user } = useAuth()
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(50)
    setProgress(60)
    setTimeout(() => {
      setProgress(100)
    }, 800)
  }, [])

  // fetching tournament data
  const [FFtournaments, setFFtournaments] = useState([])
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await database.listDocuments(db_id, 'ff_tournaments', [Query.orderDesc('$createdAt')])
        setFFtournaments(response.documents)
      } catch (error) {
        toast.error("An error occurred")
      }
    }
    fetchTournaments()
  }, [])


  return (
    <>
      <LoadingBar
        color='#F88B26'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Helmet>
        <title>Free Fire Tournaments - EsportsGravity</title>
        <meta name="description" content="Join Free Fire tournaments and matches and win deserving prizes." />
      </Helmet>

      <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-end h-72 w-full bg-[url("/images/free-fire-criminal-bundle-bg.jpg")] bg-cover bg-top'>
          <div className='bg-gradient-to-t from-frameBG to-transparent bg-cover h-full px-6 w-full'></div>
        </div>
        <div className='w-full max-w-[1280px] px-6 self-center flex flex-col'>
          <div className="flex -mt-20 w-full">
            <div className='md:h-44 h-32 w-36 rounded-[5px] bg-[url("/images/FF_DP.jpg")] bg-cover bg-center'></div>
            <div className="flex flex-col ml-4 self-end w-full">
              <h3 className='font-bold md:text-4xl text-2xl text-offWhite'>Garena Free Fire</h3>
              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-4 gap-2 mt-4">
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Entry Fee</label>
                  <select name="entry_fee_drop" id="" className='custom-dropdown'>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Game Mode</label>
                  <select name="game_mode" id="" className='custom-dropdown'>
                    <option value="battle_royale">Battle Royale</option>
                    <option value="clash_squad">Clash Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Team Type</label>
                  <select name="team_type" id="" className='custom-dropdown'>
                    <option value="solo">Solo</option>
                    <option value="duo">Duo</option>
                    <option value="squad">Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Status</label>
                  <select name="status" id="" className='custom-dropdown'>
                    <option value="open">Open</option>
                    <option value="full">Full</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end col-span-1">
                  <button className='bg-primary text-secondary font-extrabold px-4 py-[9px] rounded-[5px]'>Filter</button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[0.8px] bg-inactive bg-opacity-20 my-10"></div>

          {/* all tournament cards here  */}
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-3 content-center">
            {FFtournaments && FFtournaments.map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}

          </div>
        </div>
      </div>
    </>

  )
}
