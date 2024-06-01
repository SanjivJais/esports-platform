import React, { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'
import Breadcrumbs from '../components/Breadcrumbs'

export const PubgTournaments = () => {
  

  const [progress, setProgress] = useState(0)
  useEffect(() => {
    setTimeout(() => {
      setProgress(100)
    }, 500)
  }, [])

  return (

    <>
      <LoadingBar
        color='#F88B26'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className='flex flex-col items-center'>
        <div className='flex flex-col justify-end h-72 w-full bg-[url("/images/pubg-tournament-page-bg.jpg")] bg-cover bg-center'>
          <div className='bg-gradient-to-t from-frameBG to-transparent bg-cover h-full px-6 w-full'></div>
        </div>
        <div className='w-full max-w-[1280px] px-6 self-center flex flex-col'>
          <div className="flex -mt-20 w-full">
            <div className='md:h-44 h-32 w-36 rounded-[5px] bg-[url("/images/PUBG_DP.jpg")] bg-cover bg-center'></div>
            <div className="flex flex-col ml-4 self-end w-full">
              <div className="mb-[6px]"><Breadcrumbs /></div>
              <h3 className='font-bold md:text-4xl text-2xl text-offWhite'>PUBG Mobile</h3>


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

          <div className='w-full h-64 border-[0.8px] border-inactive border-opacity-20 rounded-[5px] flex justify-center items-center text-inactive'>
            <div className='flex flex-col gap-3 items-center text-xl font-bold '>
              Coming Soon!
            </div>
          </div>
          
        </div>
      </div>
    </>

  )
}
