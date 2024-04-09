import React, { useState } from 'react'

export const TournModalComponent = ({ tournament }) => {
    // const [activeTab, setActiveTab] = useState("Overview");
    // const handleTabs = (e) => {
    //     setActiveTab(e.target.content);
    // }

    return (
        <div className='w-full h-full'>
            <div className='h-[45%] flex flex-col justify-between' style={{
                backgroundImage: `url("${tournament.imgURL}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='self-start bg-secondary h-fit bg-opacity-60 relative text-[12px] px-3 py-[3px] rounded-xl top-3 left-3'>{tournament.gameTitle}</div>
                <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                    <div className="w-[60%]">
                        <h2 className='text-4xl font-semibold text-offWhite mb-4'>Esports Tournament #1</h2>
                        <div className="flex gap-8">
                            <label htmlFor="" className='border-b-2 border-primary pb-2 font-semibold cursor-pointer'>Overview</label>
                            <label htmlFor="" className='text-inactive pb-2 font-semibold cursor-pointer'>Entry Info</label>
                            <label htmlFor="" className='text-inactive pb-2 font-semibold cursor-pointer'>Watch Live</label>
                            <label htmlFor="" className='text-inactive pb-2 font-semibold cursor-pointer'>Rules & Details</label>
                        </div>
                        <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                    </div>
                </div>
                <div className="w-[60%]">

                </div>
                {/* <div className='border-1 border-inactive w-full h-32'>

                </div> */}
            </div>
        </div>
    )
}
