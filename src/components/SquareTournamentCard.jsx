import React, { useState } from 'react'
import { Modal } from './Modal';

export const SquareTournamentCard = ({ gameTitle, imgURL, maxPlayers, minPlayers, joinedPlayers, entryFree, gameMode, rewardType, rewardAmount, startDate, startTime }) => {
    const [showModal, setShowModal] = useState(false);

    let joinPercent = parseInt((joinedPlayers * 100) / maxPlayers);
    const cardStyles = {
        backgroundImage: `url("${imgURL}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '5px',
    };
    return (
        <div className='w-96 h-auto rounded-[5px] border-[0.8px] border-inactive border-opacity-40 hover:shadow-card'>
            <div className={`flex flex-col justify-between rounded-br-none rounded-bl-none w-full h-52`} style={cardStyles}>
                <label htmlFor="Game Title" className='self-end bg-secondary h-fit bg-opacity-80 relative text-[12px] px-3 py-[3px] rounded-xl top-2 right-2 text-end'>{gameTitle}</label>
                <div className='bg-secondary bg-opacity-80 px-3 py-3'>
                    <div className="flex justify-between  text-[13px] mb-1">
                        <label htmlFor="" >Players Joined</label>
                        <label htmlFor=""><span>{joinedPlayers}</span> / <span className='text-primary'>{maxPlayers}</span></label>
                    </div>
                    <div className='bg-gray w-full h-2 rounded-lg'>
                        <div className={`bg-primary h-2 rounded-lg`} style={{ width: joinPercent + '%' }}></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pb-3 px-3 text-sm">
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>ENTRY</label>
                        <div className='font-semibold flex items-center gap-1'>{entryFree !== 0 && <img className='' src="\Coin.svg" alt="" />}{entryFree == 0 ? 'Free Entry' : entryFree}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>MODE</label>
                        <div className='font-semibold'>{gameMode}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>MIN/MAX</label>
                        <div className='font-semibold'>{minPlayers} / {maxPlayers}</div>
                    </div>
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>REWARDS</label>
                        <div className='font-semibold flex items-center gap-1'>{rewardType === "coin" && <img className='' src="\Coin.svg" alt="" />} {rewardAmount}</div>
                    </div>
                </div>
                <div className="h-[1px] bg-inactive bg-opacity-40 my-4"></div>
                <div className="flex justify-between">
                    <div>
                        <label htmlFor="" className='text-[12px] text-dimText'>STARTING</label>
                        <div className='font-semibold flex gap-2'><span>{startDate}</span> <span>.</span> <span>{startTime}</span></div>
                    </div>
                    {/* <button className=' px-5 py-2 hover:text-secondary border-[1px] border-inactive hover:border-primary transition-colors duration-150 ease-in-out border-opacity-50 rounded-[5px] font-bold hover:bg-primary'>View Details</button> */}
                    <button onClick={()=>setShowModal(true)} className=' px-5 py-2 text-secondary rounded-[5px] font-bold bg-primary'>View Details</button>
                </div>

            </div>
            <Modal isVisible={showModal} onClose={()=>setShowModal(false)} />
        </div>
    )
}
