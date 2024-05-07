import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { IoGameController } from 'react-icons/io5'

export const Games = () => {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
    }, 500)
  }, [])




  return (
    <>
      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />

      <Helmet>
        <title>Games - EsportsGravity</title>
        <meta name="description" content="Show off your skills in multiple titles, or master in your favorite one!" />

      </Helmet>

      <div className="py-3 pl-4"><Breadcrumbs /></div>
      <div className='p-4'>
        <h1 className='font-bold text-2xl text-offWhite flex items-center gap-2'><IoGameController /><span>Games</span></h1>
        <div className="grid md:grid-cols-6 gap-3 grid-cols-2 gap-y-3 my-4">
          <Link to={'/tournaments/freefire'} className="md:col-span-1 col-span-1  bg-[url('/images/FF_Large_DP.jpg')] h-[260px] w-full bg-cover md:bg-center bg-top rounded-[5px] border-[1px] border-inactive hover:border-primary hover:border-2 transition-colors duration-200 cursor-pointer hover:shadow-card">
            <div className="tournModalComponent-custom-gradient flex flex-col-reverse rounded-[5px] ">
              <h3 className='self-center mb-2 font-medium text-offBlue'>Garena Free Fire</h3>

            </div>
          </Link>
          <Link to={'/tournaments/pubgmobile'} className="md:col-span-1 col-span-1  bg-[url('/images/Pubg_Large_DP.jpg')] h-[260px] w-full bg-cover md:bg-center bg-top rounded-[5px] border-[1px] border-inactive hover:border-primary hover:border-2 transition-colors duration-200 cursor-pointer hover:shadow-card">
            <div className="tournModalComponent-custom-gradient flex flex-col-reverse rounded-[5px] ">
              <h3 className='self-center mb-2 font-medium text-offBlue'>PUBG Mobile</h3>
            </div>
          </Link>

          <div className="md:col-span-4 col-span-2 rounded-[5px] bg-secondary bg-[url('/images/MobileLegends_Banner.jpg')] h-[260px] w-full bg-cover bg-center ">
            <div className="bg-frameBG h-full w-full bg-opacity-80 backdrop-blur-[3px] flex justify-center items-center">
              <h3 className='font-semibold text-xl text-offBlue'>More Games To Come</h3>
            </div>

          </div>
        </div>
      </div>

    </>
  )
}
