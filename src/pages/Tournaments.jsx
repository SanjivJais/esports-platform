import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { FaTrophy } from 'react-icons/fa6'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import { database, db_id } from '../../config/Appwrite'
import { Query } from 'appwrite'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { GiSilverBullet } from 'react-icons/gi'
import { Helmet } from 'react-helmet'

export const Tournaments = () => {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(90)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
  }, [])

  const [FFtournaments, setFFtournaments] = useState([])
  useEffect(() => {
    const fetchFFTournaments = async () => {
      try {
        const response = await database.listDocuments(db_id, 'ff_tournaments', [Query.limit(6), Query.orderDesc('$createdAt')])
        setFFtournaments(response.documents)
      } catch (error) {
        toast.error("Something went wrong!")
      }
    }
    fetchFFTournaments()
  }, [])





  return (
    <>
      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />
      <Helmet>
        <title>Tournaments - EsportsGravity</title>
        <meta name="description" content="Join tournaments matching your interest." />
      </Helmet>

      <div className="py-3 pl-4"><Breadcrumbs /></div>
      <div className="px-4 py-2">
        <h1 className='flex items-center gap-2 text-2xl text-offWhite font-bold'><FaTrophy /><span>Tournaments</span></h1>

        {FFtournaments && FFtournaments.filter((tourn) => tourn.isFeatured).length > 0 && <section className='mb-8'>
          <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-xl text-lg text-offBlue'><GiSilverBullet className='text-green-600' /><h2>Featured</h2></span></div>
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
            {FFtournaments.filter((tourn) => tourn.isFeatured).slice(0, 3).map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}
          </div>
        </section>}
        {FFtournaments && FFtournaments.filter((tourn) => (tourn.status === 'Open' || tourn.status === 'Ongoing')).length > 0 && <section className='my-8'>
          <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-xl text-lg text-offBlue'><GiSilverBullet className='text-ongoingStatus' /><h2>Active</h2></span></div>
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
            {FFtournaments.filter((tourn) => (tourn.status === 'Open' || tourn.status === 'Ongoing')).slice(0, 3).map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}
          </div>
        </section>}
        <section className='my-8'>
          <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-xl text-lg text-offBlue'><GiSilverBullet className='text-primary' /><h2>Free Fire Tournaments</h2></span><Link to={'/tournaments/freefire'} className='text-primary text-sm'>View All »</Link></div>
          <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
            {FFtournaments && FFtournaments.map((tournament, index) => (
              <FFSquareTournamentCard key={index}
                tournament={tournament}
              />
            ))}
          </div>
        </section>
        <section>
          <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-xl text-lg text-offBlue'><GiSilverBullet className='text-primary' /><h3>PUBG Mobile Tournaments</h3></span><Link to={'/tournaments/pubgmobile'} className='text-primary text-sm'>View All »</Link></div>
          <div className='w-full h-64 mt-4 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
            <div className='flex flex-col gap-3 items-center text-xl font-bold '>
              PUBG Tournaments will be Available Soon, Stay Tuned!
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
