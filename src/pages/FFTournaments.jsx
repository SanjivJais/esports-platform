import React, { useEffect, useState } from 'react'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import LoadingBar from 'react-top-loading-bar'
import { Helmet } from 'react-helmet'
import { ID, database, db_id } from '../../config/Appwrite';
import { toast } from 'react-toastify'
import { Query } from 'appwrite'
import Breadcrumbs from '../components/Breadcrumbs';


export const FFTournaments = () => {
  const [progress, setProgress] = useState(0)

  // fetching tournament data

  const [FFtournaments, setFFtournaments] = useState([])
  const [filteredTourns, setFilteredTourns] = useState([])

  useEffect(() => {
    setProgress(40)
    const fetchTournaments = async () => {
      try {
        const response = await database.listDocuments(db_id, 'ff_tournaments', [Query.orderDesc('$createdAt')])
        setFFtournaments(response.documents)
        setFilteredTourns(response.documents)

      } catch (error) {
        toast.error("An error occurred")
      }
    }
    fetchTournaments()
    setProgress(70)
    setProgress(100)
  }, [])

  const [filterValues, setFilterValues] = useState({
    'entry_fee_drop': 'free',
    'game_mode': 'Battle Royale',
    'team_type': 'Solo',
    'status': 'Open'
  })

  const [enableFilter, setEnableFilter] = useState(false)
  const handleFilter = () => {
    setFilteredTourns(FFtournaments.filter((tournament) => (
      (filterValues.status === 'Full' ? tournament.participants.length == tournament.max : tournament.status == filterValues.status)
      &&
      (filterValues.entry_fee_drop === 'free' ? tournament.entryFee === 0 : tournament.entryFee > 0)
      &&
      (filterValues.game_mode === tournament.gameMode)
      &&
      (filterValues.team_type === tournament.teamType)
    )))
  }

  useEffect(() => {
    if (enableFilter) {
      handleFilter()
    } else {
      setFilteredTourns(FFtournaments)
    }
  }, [enableFilter])


  const handleFilterVariables = (e) => {
    e.preventDefault()
    let { name, value } = e.target;

    setFilterValues((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

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
              <div className="mb-[6px]"><Breadcrumbs /></div>
              <h2 className='font-bold md:text-4xl text-2xl text-offWhite'>Garena Free Fire</h2>

              {/* filter variables start here */}
              <div className="grid md:grid-cols-5 grid-cols-2 md:gap-4 gap-2 mt-4">
                <div className="flex flex-col col-span-1">
                  <div className='text-inactive text-sm mb-2 font-semibold'>Entry Fee</div>
                  <select value={filterValues.entry_fee_drop} onChange={(e) => handleFilterVariables(e)} name="entry_fee_drop" id="" className='custom-dropdown'>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <div className='text-inactive text-sm mb-2 font-semibold'>Game Mode</div>
                  <select value={filterValues.game_mode} onChange={(e) => handleFilterVariables(e)} name="game_mode" id="" className='custom-dropdown'>
                    <option value="Battle Royale">Battle Royale</option>
                    <option value="Clash Squad">Clash Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <div className='text-inactive text-sm mb-2 font-semibold'>Team Type</div>
                  <select value={filterValues.team_type} onChange={(e) => handleFilterVariables(e)} name="team_type" id="" className='custom-dropdown'>
                    <option value="Solo">Solo</option>
                    <option value="Duo">Duo</option>
                    <option value="Squad">Squad</option>
                  </select>
                </div>
                <div className="flex flex-col col-span-1">
                  <div className='text-inactive text-sm mb-2 font-semibold'>Status</div>
                  <select value={filterValues.status} onChange={(e) => handleFilterVariables(e)} name="status" id="" className='custom-dropdown'>
                    <option value="Open">Open</option>
                    <option value="Full">Full</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Finished">Finished</option>
                    <option value="Aborted">Aborted</option>
                  </select>
                </div>
                <div className="flex flex-col justify-end col-span-1">
                  <div className='text-inactive text-sm ont-semiboldf'>
                    <label className="inline-flex items-center cursor-pointer">
                      <input onChange={() => setEnableFilter(!enableFilter)} type="checkbox" value="" className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-secondaryLight peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{enableFilter ? 'Disable' : 'Enable'}</span>
                    </label>
                  </div>

                  <button disabled={!enableFilter} onClick={handleFilter} className={`${enableFilter ? '' : 'bg-opacity-60'} bg-primary text-secondary font-extrabold px-4 py-[9px] rounded-[5px]`}>Filter</button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-[0.8px] bg-inactive bg-opacity-20 my-10"></div>

          {/* all tournament cards here  */}
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mb-3 content-center">
            {filteredTourns && filteredTourns.map((tournament, index) => (
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
