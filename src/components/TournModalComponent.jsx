import React, { useEffect, useState } from 'react'
import { MdInfo } from "react-icons/md";

export const TournModalComponent = ({ tournament }) => {
    let totalPrize = tournament.firstPrize + tournament.secondPrize + tournament.thirdPrize;
    let joinPercent = parseInt((tournament.joinedPlayers * 100) / tournament.maxPlayers);

    const tabs = document.getElementsByClassName("tournTab");
    let [activeTab, setActiveTab] = useState(0);
    const handleTabs = (event) => {
        const index = Array.from(tabs).indexOf(event.target);
        setActiveTab(index);
    }

    useEffect(() => (
        setActiveTab(activeTab)
    ), [activeTab])


    return (
        <div className='h-[92vh] w-[72vw]'>
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
                            <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 0 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Overview</label>
                            <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 1 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Entry Info</label>
                            <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 2 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Watch Live</label>
                            <label htmlFor="" onClick={(e) => handleTabs(e)} className={`tournTab ${activeTab === 3 ? 'border-b-2 border-primary' : 'text-inactive hover:text-offBlue'}  pb-2 font-semibold cursor-pointer`}>Rules & Details</label>
                        </div>
                        <div className="h-[1px] bg-inactive bg-opacity-25 w-full"></div>
                    </div>
                </div>
            </div>
            <div className='w-full px-4 py-6 flex gap-4'>
                <div className="w-[64%] flex flex-col">

                    {activeTab === 0 &&
                        <>
                            <div className="grid grid-cols-4 gap-x-4 gap-y-8">
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>ENTRY FEE </span></label>
                                    <div className='font-medium flex items-center gap-1'>{tournament.entryFree !== 0 && <img className='' src="/Coin.svg" alt="" />}{tournament.entryFree == 0 ? 'Free Entry' : tournament.entryFree}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MODE </span><span><MdInfo /></span></label>
                                    <div className='font-medium'>{tournament.gameMode}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>TYPE </span><span><MdInfo /></span></label>
                                    <div className='font-medium'>{tournament.gameType}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>MIN / MAX </span><span><MdInfo /></span></label>
                                    <div className='font-medium'>{tournament.minPlayers} / {tournament.maxPlayers}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>PRIZE POOL </span><span><MdInfo /></span></label>
                                    <div className='font-medium flex items-center gap-1'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {totalPrize}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>STARTING </span></label>
                                    <div className='font-medium flex items-center gap-1'>{tournament.startDate}</div>
                                </div>
                                <div>
                                    <label htmlFor="" className='text-[13px] text-inactive font-semibold flex items-center gap-1'><span>TIME </span></label>
                                    <div className='font-medium flex items-center gap-1'>{tournament.startTime}</div>
                                </div>
                                
                            </div>
                        </>
                    }
                    {activeTab === 1 &&
                        <div>
                            Entry Info
                        </div>
                    }
                    {activeTab === 2 &&
                        <div>
                            Watch Live
                        </div>
                    }
                    {activeTab === 3 &&
                        <div>
                            Rules & Details
                        </div>
                    }















                </div>
                <div className='h-auto w-[36%] bg-frameBG rounded-[5px] flex flex-col -mt-12'>

                    <div className='bg-secondaryLight py-3 px-4 flex justify-between rounded-tr-[5px] rounded-tl-[5px]'>
                        <h3 className='font-bold text-lg text-offBlue'>Prize Pool</h3>
                        <div>{tournament.startTime} / {tournament.startDate}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/firstTrophy.svg" alt="" /> <span>1<sup> st</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.firstPrize}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/secondTrophy.svg" alt="" /> <span>2<sup> nd</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.secondPrize}</div>
                    </div>
                    <div className="h-[1px] bg-black bg-opacity-25"></div>
                    <div className='py-4 px-4 flex justify-between'>
                        <h3 className='font-semibold text-md text-offBlue flex gap-2 items-center'><img src="/thirdTrophy.svg" alt="" /> <span>3<sup> rd</sup> Place</span></h3>
                        <div className='flex gap-2 items-center'>{tournament.rewardType === "coin" && <img className='' src="/Coin.svg" alt="" />} {tournament.thirdPrize}</div>
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
                    <div className='p-2 flex flex-col justify-between'>
                        <button className='bg-primary text-secondary font-bold p-2 rounded-[5px]'>Join Now</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
