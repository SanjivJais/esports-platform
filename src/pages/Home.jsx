import React, { useEffect, useState } from 'react'
import { FFSquareTournamentCard } from '../components/FFComps/FFSquareTournamentCard'
import { Slider } from '../components/Slider'
import { FaTrophy } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import { Helmet } from 'react-helmet'
import { ID, database, db_id } from '../../config/Appwrite';
import { toast } from 'react-toastify'
import { Query } from 'appwrite'


export const Home = () => {


  // top loading progress bar
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(50)
    setProgress(60)
    setTimeout(() => {
      setProgress(100)
    }, 800)
  }, [])

  const [FFtournaments, setFFtournaments] = useState([])
  useEffect(() => {
    const fetchFFTournaments = async () => {
      try {
        const response = await database.listDocuments(db_id, 'ff_tournaments', [Query.limit(3), Query.orderDesc('$createdAt')])
        setFFtournaments(response.documents)
      } catch (error) {
        toast.error("An error occurred")
      }
    }
    fetchFFTournaments()
  }, [])

  return (
    <>
      <LoadingBar
        color='#F88B26'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <Helmet>
        <title>EsportsGravity - Nepal's Leading Platform for Esports</title>
        <meta name="description" content="EsportsGravity is the ultimate platform to shine in the esports realm." />
      </Helmet>

      <div className='py-4 px-4 flex flex-col items-center self-center w-full max-w-[1440px]'>
        <div className='mb-2 w-full'><Slider /></div>
        <div className="h-[0.8px] bg-inactive bg-opacity-20 w-full"></div>
        <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-[24px] text-xl text-offBlue'><FaTrophy /><h3>Free Fire Tournaments</h3></span><Link to={'/tournaments/freefire'} className='text-primary text-sm'>View All »</Link></div>
        <div className="w-full grid 2xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 my-4 content-center">
          {FFtournaments && FFtournaments.map((tournament, index) => (
            <FFSquareTournamentCard key={index}
              tournament={tournament}
            />
          ))}
        </div>

        {/* promotional banner homepage  */}
        <div className='h-[120px] w-full mt-4 bg-[url("/images/promotionalBanner1.png")] bg-cover bg-left rounded-[5px]'></div>

        <div className="flex justify-between items-center mt-6 w-full self-start"><span className='flex items-center gap-2 font-semibold md:text-[24px] text-xl text-offBlue'><FaTrophy /><h3>PUBG Tournaments</h3></span><Link to={'/tournaments/pubgmobile'} className='text-primary text-sm'>View All »</Link></div>
        <div className='w-full h-64 mt-4 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
          <div className='flex flex-col gap-3 items-center text-xl font-bold '>
            PUBG Tournaments will be Available Soon, Stay Tuned!
          </div>
        </div>
      </div>
    </>

  )
}
