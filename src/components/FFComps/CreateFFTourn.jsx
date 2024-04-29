import React from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'

export const CreateFFTourn = () => {
    return (
        <div className='p-4 lg:w-[60vw] md:w-[80vw] w-[90vw] h-[90vh]'>
            <div className="flex flex-col gap-4 mt-8 mx-4 pb-8">
                <img src="/images/FF_Long_logo.png" alt="" className='w-36 h-auto self-center' />
                <div className="flex flex-col gap-1">
                    <div>Tournament title <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Title here (<150 characters)' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Image URL <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='Thumbnail image URL' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Game Mode <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Battle Royale' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Team Type <span className='text-red-600'>*</span></div>
                    <select name="teamType" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="solo">Solo</option>
                        <option value="duo">Duo</option>
                        <option value="squad">Squad</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Map <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="text" placeholder='Eg. Random' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Matches <span className='text-red-600'>*</span></div>
                    <input min={1} className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 1' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Max <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 48' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Min <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 20' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Entry Fee</div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='Eg. 0' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Reward Type <span className='text-red-600'>*</span></div>
                    <select name="rewardType" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="eg_coin">EG Coin</option>
                        {/* <option value="token">Token</option> */}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Prizes <span className='text-red-600'>*</span></div>
                    <div className='flex flex-col gap-2'>
                        <div className="flex items-center">
                            <input className='w-full bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="number" placeholder='1st place prize' />
                            <div className='w-14 h-10 text-xl flex justify-center items-center bg-secondaryLight cursor-pointer'><IoIosAddCircleOutline /></div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Start Time <span className='text-red-600'>*</span></div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="datetime-local" />
                </div>
                <div className="flex flex-col gap-1">
                    <div>YT Live URL</div>
                    <input className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none' type="url" placeholder='YT Video Link' />
                </div>
                <div className="flex flex-col gap-1">
                    <div>Rules & Details <span className='text-red-600'>*</span></div>
                    <textarea name="" id="" cols="30" placeholder='Rules, Details, and Guides' className='bg-transparent py-2 px-3 rounded-[5px] border-2 border-inactive border-opacity-20 placeholder:text-sm placeholder:text-inactive focus:border-opacity-80 focus:outline-none'></textarea>
                </div>
                <div className="flex flex-col gap-1">
                    <div>Is Featured?</div>
                    <select defaultValue={false} name="isFeatured" id="" className='custom-dropdown border-2 border-inactive border-opacity-20 text-offBlue'>
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>

                <button className='bg-primary text-secondary px-3 py-2 rounded font-bold '>Create Tournament</button>
            </div>
        </div>
    )
}
