import React from 'react'
import { Link } from 'react-router-dom'

export const FFTournaments = () => {

  return (
    <div className='flex flex-col items-center'>
      <div className='flex flex-col justify-end h-80 w-full bg-[url("/images/free-fire-criminal-bundle-bg.jpg")] bg-cover bg-top'>
        <div className='bg-gradient-to-t from-frameBG to-transparent bg-cover h-full px-6 w-full'></div>
      </div>
      <div className='w-full max-w-[1280px] px-6 self-center flex flex-col'>
        <div className="flex -mt-20 w-full">
          <img src="/images/FF_DP.jpg" alt="" className='h-40 w-auto rounded-[5px]' />
          <div className="flex flex-col ml-4 self-end w-full">
            <h3 className='font-bold text-4xl text-offWhite'>Garena Free Fire</h3>
            <div className="grid grid-cols-5 gap-4 mt-4">
              <div className="flex flex-col col-span-1">
                <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Entry Fee</label>
                <select  name="entry_fee_drop" id="" className='custom-dropdown'>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>
              </div>
              <div className="flex flex-col col-span-1">
                <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Game Mode</label>
                <select  name="game_mode" id="" className='custom-dropdown'>
                  <option value="battle_royale">Battle Royale</option>
                  <option value="clash_squad">Clash Squad</option>
                </select>
              </div>
              <div className="flex flex-col col-span-1">
                <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Team Type</label>
                <select  name="team_type" id="" className='custom-dropdown'>
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                  <option value="squad">Squad</option>
                </select>
              </div>
              <div className="flex flex-col col-span-1">
                <label htmlFor="" className='text-inactive text-sm mb-2 font-semibold'>Status</label>
                <select  name="status" id="" className='custom-dropdown'>
                  <option value="open">Open</option>
                  <option value="full">Full</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex flex-col justify-end col-span-1">
                <button className='bg-primary text-secondary font-bold px-4 py-[9px] rounded-[5px]'>Search</button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
