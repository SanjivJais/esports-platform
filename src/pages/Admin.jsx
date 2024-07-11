import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { CreateTourn } from '../components/Tournament/CreateTourn';
import { Link } from 'react-router-dom';

export const Admin = () => {

  const [sideTab, setSideTab] = useState(0)

  const tabs = document.getElementsByClassName("subTab");
  let [activeTab, setActiveTab] = useState(0);
  const handleTabs = (event) => {
    const index = Array.from(tabs).indexOf(event.target);
    setActiveTab(index);
  }

  useEffect(() => (
    setActiveTab(activeTab)
  ), [activeTab])




  return (
    <>
      <Helmet>
        <title>Official Admin - EsportsGravity</title>
      </Helmet>

      <div className='flex'>
        {/* Sidebar */}
        <div className="flex flex-col min-w-[274px] h-screen sticky top-0 left-0 bg-secondary px-4 py-6">
          <Link to={'/'} className='self-center font-bold text-xl'><h2>EG Admin</h2></Link>

          {/* menu options */}
          <div className="flex flex-col gap-3 mt-10">
            <div onClick={() => setSideTab(0)} className={`rounded-[5px] p-3 cursor-pointer ${sideTab === 0 ? 'bg-adminColor text-secondary font-semibold' : 'bg-secondaryLight hover:bg-adminColor hover:text-secondary font-semibold'}  transition-colors duration-150 ease-in-out`}>Tournament</div>
            <div className={`rounded-[5px] p-3 cursor-pointer ${sideTab === 1 ? 'bg-adminColor text-secondary font-semibold' : 'hover:bg-secondaryLight font-semibold text-offBlue'}  transition-colors duration-150 ease-in-out`}>Notification</div>
            <div className={`rounded-[5px] p-3 cursor-pointer ${sideTab === 2 ? 'bg-adminColor text-secondary font-semibold' : 'hover:bg-secondaryLight font-semibold text-offBlue'}  transition-colors duration-150 ease-in-out`}>Data analysis</div>
          </div>

        </div>
        {/* body */}
        <div className="flex flex-col w-full">

          {/* top tabs */}
          <div className="flex flex-col justify-end gap-8 bg-secondary h-36 px-6 border-b-[0.8px] border-inactive border-opacity-20">

            {sideTab === 0 && <h2 className='text-2xl font-semibold text-offBlue'>Tournament</h2>}

            <div className='flex gap-6 text-nowrap overflow-x-auto w-full h-auto'>
              {
                sideTab === 0 && <>
                  <div onClick={(e) => handleTabs(e)} className={`subTab ${activeTab === 0 ? 'md:border-b-2 md:border-adminColor md:text-offBlue text-adminborder-adminColor bg-secondaryLight' : 'text-inactive hover:bg-secondaryLight transition-transform duration-150 ease-in-out'} rounded-tr-[5px] rounded-tl-[5px]  px-4 py-2 font-semibold cursor-pointer`}>Create New</div>
                  <div onClick={(e) => handleTabs(e)} className={`subTab ${activeTab === 1 ? 'md:border-b-2 md:border-adminColor md:text-offBlue text-adminborder-adminColor bg-secondaryLight' : 'text-inactive hover:bg-secondaryLight transition-transform duration-150 ease-in-out'} rounded-tr-[5px] rounded-tl-[5px]  px-4 py-2 font-semibold cursor-pointer`}>Drafts</div>
                  <div onClick={(e) => handleTabs(e)} className={`subTab ${activeTab === 2 ? 'md:border-b-2 md:border-adminColor md:text-offBlue text-adminborder-adminColor bg-secondaryLight' : 'text-inactive hover:bg-secondaryLight transition-transform duration-150 ease-in-out'} rounded-tr-[5px] rounded-tl-[5px]  px-4 py-2 font-semibold cursor-pointer`}>Active</div>
                  <div onClick={(e) => handleTabs(e)} className={`subTab ${activeTab === 3 ? 'md:border-b-2 md:border-adminColor md:text-offBlue text-adminborder-adminColor bg-secondaryLight' : 'text-inactive hover:bg-secondaryLight transition-transform duration-150 ease-in-out'} rounded-tr-[5px] rounded-tl-[5px]  px-4 py-2 font-semibold cursor-pointer`}>Upcoming</div>
                  <div onClick={(e) => handleTabs(e)} className={`subTab ${activeTab === 4 ? 'md:border-b-2 md:border-adminColor md:text-offBlue text-adminborder-adminColor bg-secondaryLight' : 'text-inactive hover:bg-secondaryLight transition-transform duration-150 ease-in-out'} rounded-tr-[5px] rounded-tl-[5px]  px-4 py-2 font-semibold cursor-pointer`}>Concluded</div>
                </>
              }

            </div>

          </div>


          <div className='px-4 w-full'>

            {sideTab === 0 && activeTab === 0 && <>
              <CreateTourn />
            </>}

          </div>


        </div>


      </div>




    </>
  )
}
