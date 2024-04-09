import React, { useState } from 'react'

export const TournModalComponent = ({ tournament }) => {
    // const [activeTab, setActiveTab] = useState("Overview");
    // const handleTabs = (e) => {
    //     setActiveTab(e.target.content);
    // }
    let joinPercent = parseInt((tournament.joinedPlayers * 100) / tournament.maxPlayers);


    return (
        <div className='w-full h-full'>
            <div className='h-[45%] flex flex-col justify-between' style={{
                backgroundImage: `url("${tournament.imgURL}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='self-start bg-secondary h-fit bg-opacity-60 relative text-[12px] px-3 py-[3px] rounded-xl top-3 left-3'>{tournament.gameTitle}</div>
                <div className='tournModalComponent-custom-gradient h-full flex flex-col justify-end items-start px-4'>
                    <div className="w-[62%]">
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
            </div>
            <div className='w-full px-4 flex gap-4'>
                <div className="w-[64%] flex flex-col">

                </div>
                <div className='h-auto w-[36%] bg-frameBG flex flex-col -mt-8'>
                    <div className='bg-secondaryLight py-3 px-4 rounded-tr-[5px] rounded-tl-[5px]'>
                        <h3 className='font-bold text-2xl text-offBlue'>Tournament Prize</h3>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-15"></div>
                    <div className='bg-secondaryLight py-3 px-4 flex justify-between'>
                        <h3 className='font-semibold text-lg text-offBlue'>Prize Pool</h3>
                        <div>{tournament.startTime} / {tournament.startDate}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/firstTrophy.svg" alt="" /> <span>1<sup> st</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.rewardAmount}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/secondTrophy.svg" alt="" /> <span>2<sup> nd</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.rewardAmount}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/thirdTrophy.svg" alt="" /> <span>3<sup> rd</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.rewardAmount}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex flex-col justify-between rounded-br-[5px] rounded-bl-[5px]'>
                        <div className="flex justify-between text-[14px] mb-1">
                            <label htmlFor="" >Players Joined</label>
                            <label htmlFor=""><span>{tournament.joinedPlayers}</span> / <span className='text-primary'>{tournament.maxPlayers}</span></label>
                        </div>
                        <div className='bg-gray w-full h-2 rounded-lg'>
                            <div className={`bg-primary h-2 rounded-lg`} style={{ width: joinPercent + '%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
