import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { GrAnnounce } from 'react-icons/gr'


export const Announcements = () => {

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setProgress(50)
    setTimeout(() => {
      setProgress(100)
    }, 1000)
  }, [])

  return (
    <>
      <LoadingBar color='#F88B26' progress={progress} onLoaderFinished={() => setProgress(0)} />

      <Helmet>
        <title>Announcements - EsportsGravity</title>
        <meta name="description" content="All the latest announcements from us!" />
      </Helmet>

      <div className='bg-gradient-to-r from-frameBG to-secondaryLight  w-full h-60 flex flex-col items-center justify-center gap-3'>
        <div className=""><Breadcrumbs /></div>
        <h1 className='text-3xl font-bold text-offWhite flex gap-2 items-center'><GrAnnounce /><span>Announcements</span></h1>
      </div>

      <div className="flex flex-col min-h-[420px]">

      </div>

    </>
  )
}
