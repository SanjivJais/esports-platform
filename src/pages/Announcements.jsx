import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'
import { GrAnnounce } from 'react-icons/gr'
import { AnnouncementsCard } from '../components/AnnouncementsCard'
import { toast } from 'react-toastify'
import { ID, database, db_id } from '../../config/Appwrite'
import { Query } from 'appwrite'



export const Announcements = () => {

  const [progress, setProgress] = useState(0)

  const tabs = document.getElementsByClassName("announcementTab");
  let [activeTab, setActiveTab] = useState(0);
  const handleTabs = (event) => {
    const index = Array.from(tabs).indexOf(event.target);
    setActiveTab(index);
  }

  useEffect(() => (
    setActiveTab(activeTab)
  ), [activeTab])


  const [announcements, setAnnouncements] = useState([])
  useEffect(() => {
    const fetchAnnouncements = async () => {
      setProgress(50)
      try {
        const response = await database.listDocuments(db_id, 'announcements', [Query.orderDesc('$createdAt')])
        setAnnouncements(response.documents)
      } catch (error) {
        toast.error("Something went wrong!")
      }
    }
    fetchAnnouncements();
    setProgress(100)
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

      <div className="flex flex-col min-h-[420px] w-full max-w-[800px] px-4 self-center mt-6 items-start">
        <div className="flex max-md:justify-between md:gap-6 gap-4 text-base custom-scrollbar whitespace-nowrap overflow-x-auto">
          <div onClick={(e) => handleTabs(e)} className={`announcementTab ${activeTab === 0 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-1 font-semibold cursor-pointer`}>Latest</div>
          <div onClick={(e) => handleTabs(e)} className={`announcementTab ${activeTab === 1 ? 'md:border-b-2 md:border-primary md:text-offBlue text-primary' : 'text-inactive hover:text-offBlue'}  pb-1 font-semibold cursor-pointer`}>Featured</div>
        </div>

        {activeTab === 0 &&
          <div className='md:mt-3'>
            {announcements.length > 0 ?
              <>
                {announcements.map((announcement, index) => (
                  <AnnouncementsCard key={index} announcement={announcement} />
                ))}
              </>
              :
              <>
                <div className='text-inactive font-semibold text-md'>
                  All recent announcements will show up here!
                </div>
              </>
            }
          </div>
        }
        {activeTab === 1 &&
          <div className='md:mt-3'>
            {announcements.filter((announcement)=>announcement.isFeatured).length > 0 ?
              <>
                {announcements.filter((announcement)=>announcement.isFeatured).map((announcement, index) => (
                  <AnnouncementsCard key={index} announcement={announcement} />
                ))}
              </>
              :
              <>
                <div className='text-inactive font-semibold text-md'>
                  All featured announcements will show up here!
                </div>
              </>
            }
          </div>
        }
      </div>

    </>
  )
}
